import React, { useState, useRef, useEffect } from 'react'
import RecipeCard from '../components/card';
import TinderCard from 'react-tinder-card'
import SwipingButton from '../components/swipingButtons';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// fetch function
const fetchData = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/getRandRecipe`)
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error("Error fetching data from the backend:", error);
    }
}

function RecipeCardContainer() {

    const [index, setIndex] = useState(1);
    const cardRef = useRef(null);
    const [swiping, setSwiping] = useState(false);
    const [data, setData] = useState(null);
    const [generate, setGenerate] = useState(true);
    const [swipe, setSwipe] = useState('');

    useEffect(() => {
        if (generate == true) {
            setGenerate(false);
            console.log("fetching data!");
            const getData = async () => {
                const fetchedData = await fetchData();
                setData(fetchedData);
            };
            getData();
        }
    }, [generate]);


    const onSwipe = (direction) => {
        //cardRef.current.style.transitionDuration = '0.3s';
        if (!swiping) {
            setSwiping(true)
            if (direction === 'left') {
                setSwipe('left')
                console.log("adding to disliked")
            }
            else if (direction === 'right') {
                setSwipe('right')
                console.log("adding to meal plan")
            }
            else if (direction == 'down') {
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

    const handleSubmit = async (event) => {
        // need the backend to be set up to accept the swipe
    }


    return (
        <div>
            <div className="cardContainer">
            {data ? (
            <TinderCard ref={cardRef} key={index} onSwipe={onSwipe} onCardLeftScreen={onCardLeftScreen} flickOnSwipe={true} preventSwipe={swiping ? ['up', 'left', 'right', 'down'] : ['up']} swipeRequirementType='velocity' swipeThreshold={1.60} className={`card ${swiping ? 'card-swiping' : ''}`}>
                <RecipeCard title={data.recipe_name} data = {data} cookTime="CookTime: 30mins" prepTime={`prepTime: ${data.prep_time}`} servings={`Servings: ${data.servings}`} cuisine="cuisine: WALE" />
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