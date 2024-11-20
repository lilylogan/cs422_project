import React, { useState, useRef, useEffect } from 'react'
import RecipeCard from '../components/card';
import TinderCard from 'react-tinder-card'
import SwipingButton from '../components/swipingButtons';
import {useAuth} from '../context/AuthContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fetchData = async (userID) => {
    try {
        const response = await fetch(`${BACKEND_URL}/getRandRecipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userID }),
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data from the backend:", error);
    }
};


function RecipeCardContainer({ toggle }) {

    const {user} = useAuth();
    const [index, setIndex] = useState(1);
    const cardRef = useRef(null);
    const [swiping, setSwiping] = useState(false);
    const [data, setData] = useState(null);
    const [generate, setGenerate] = useState(true);
    const [swipe, setSwipe] = useState('');
    //const [action, setAction] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (generate === true) {
            setGenerate(false);
            console.log("fetching data!");
            const getData = async () => {
                if (user?.userID) {
                    const fetchedData = await fetchData(user.userID); // Pass userID here
                    setData(fetchedData);
                } else {
                    console.error("User ID is not available");
                }
            };
            getData();
        }
    }, [generate, user]);


    const onSwipe = (direction) => {
        //cardRef.current.style.transitionDuration = '0.3s';
        if (!swiping) {
            setSwiping(true)
            if (direction === 'left') {
                setSwipe('left')
                handleSubmit("dislike"); // Pass 'dislike' as the action to handleSubmit
            }
            else if (direction === 'right') {
                setSwipe('right')
                handleSubmit("add"); // Pass 'dislike' as the action to handleSubmit
                console.log("adding to meal plan")
            }
            else if (direction == 'down') {
                handleSubmit("pass"); // Pass 'dislike' as the action to handleSubmit
                setSwipe('down')
                console.log("Passing on Card")
            }
        }
    }

    const onCardLeftScreen = (direction) => {
        setGenerate(true);
        setSwiping(false)
        setIndex((prev)=> {
            return prev + 1;
        })
    }

    const swipeLeft = () => {
        if (cardRef.current) {
            cardRef.current.swipe('left')
        }
    }

    const swipeDown = () => {
        if (cardRef.current) {
            cardRef.current.swipe('down')
        }
    }

    const swipeRight = () => {
        if (cardRef.current) {
            cardRef.current.swipe('right')
        }
    }

    const handleSubmit = async (action) => {
        
        try {
            console.log("Sending request to backend");
            const response = await fetch(`${BACKEND_URL}/sendNewRecipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_action: action, recipe_id: data.recipeID, user_id: user.userID }),
            });
    
            // Check if response is okay before parsing JSON
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Action failed');
            }
    
            // Parse response JSON if the request was successful
            const responseData = await response.json();
            console.log("Response data:", responseData);

    
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div>
            <div className="cardContainer">
            {data ? (
            <TinderCard ref={cardRef} key={index} onSwipe={onSwipe} onCardLeftScreen={onCardLeftScreen} flickOnSwipe={true} preventSwipe={swiping ? ['up', 'left', 'right', 'down'] : ['up']} swipeRequirementType='velocity' swipeThreshold={1.60} className={`card ${swiping ? 'card-swiping' : ''} ${toggle ? 'toggled' : ''}`}>
                <RecipeCard title={data.recipe_name} data = {data} cookTime={`Cook Time: ${data.cook_time}`} prepTime={`Prep Time: ${data.prep_time}`} servings={`servings: ${data.servings}`} cuisine={`Cuisine: ${data.cuisine}`} image_path={data.image_path} toggle={toggle} />
            </TinderCard>
            ) : (<div>
                    loading...
                 </div>)}
            </div>
            <div className="swipeButtonContainer">
                <SwipingButton clickHandler={swipeLeft} swiping={swiping} text="Dislike" cname="dislike"/>
                <SwipingButton clickHandler={swipeDown} swiping={swiping} text="Pass" cname="pass" />
                <SwipingButton clickHandler={swipeRight} swiping={swiping} text="Add" cname="addHome" />
            </div>
        </div>
    );
}

export default RecipeCardContainer; 