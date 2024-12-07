/* 
cardContainer.js
Description: This container handles the swiping of users, and the displaying of the meal card to the user on the 
home page
Date: November 10th, 2024
Inital Author: Will Maeceau
Modified By:
*/
import React, { useState, useRef} from 'react'
import RecipeCard from '../components/card';
import TinderCard from 'react-tinder-card'
import SwipingButton from '../components/swipingButtons';
import {useAuth} from '../context/AuthContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function RecipeCardContainer({ toggle, homeData, setGenerate }) {
    // This function contains swiping logic for both the buttons and manual swipe plus the html
    // for the card and swipe buttons containers

    const {user} = useAuth();
    const [index, setIndex] = useState(1);
    const cardRef = useRef(null);
    const [swiping, setSwiping] = useState(false);
    //const [data, setData] = useState(homeData);
    const [swipe, setSwipe] = useState('');
    //const [action, setAction] = useState('');
    const [error, setError] = useState('');


    const onSwipe = (direction) => {
        //cardRef.current.style.transitionDuration = '0.3s';
        // sends the users interaction to the backend based on the users swipe
        if (!swiping) {
            setSwiping(true)
            if (direction === 'left') {
                setSwipe('left')
                handleSubmit("dislike") // Pass 'dislike' as the action to handleSubmit
            }
            else if (direction === 'right') {
                setSwipe('right')
                handleSubmit("add") // Pass 'add' as the action to handleSubmit
                console.log("adding to meal plan")
            }
            else if (direction === 'down') {
                handleSubmit("pass"); // Pass 'pass' as the action to handleSubmit
                setSwipe('down')
                console.log("Passing on Card")
            }
        }
    }

    const onCardLeftScreen = (direction) => {
        // this function resets the states once the card leaves the screen
        // to generate a new card and allow the user to swipe again
        setGenerate(true);
        setSwiping(false)
        setIndex((prev)=> {
            return prev + 1;
        })
    }

    const swipeLeft = () => {
        // swipes the card left on button click
        if (cardRef.current) {
            cardRef.current.swipe('left')
        }
    }

    const swipeDown = () => {
        // swipes the card down on button click
        if (cardRef.current) {
            cardRef.current.swipe('down')
        }
    }

    const swipeRight = () => {
        // swipes the card right on button click
        if (cardRef.current) {
            cardRef.current.swipe('right')
        }
    }

    const handleSubmit = async (action) => {
        // this function sends the users action to the backend so that it can handle it
        
        try {
            console.log("Sending request to backend");
            const response = await fetch(`${BACKEND_URL}/sendNewRecipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_action: action, recipe_id: homeData.recipeID, user_id: user.userID }),
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
                
            {homeData === null || homeData === undefined ? (
                    <div>loading...</div>
                ) : homeData.msg === "No liked recipes in the database" ? (
                    <div><h3>Like a recipe for it to show up in this deck</h3></div>
                ) : (
                    <TinderCard
                        ref={cardRef}
                        key={index}
                        onSwipe={onSwipe}
                        onCardLeftScreen={onCardLeftScreen}
                        flickOnSwipe={true}
                        preventSwipe={
                            swiping
                                ? ['up', 'left', 'right', 'down']
                                : toggle
                                ? ['up', 'down']
                                : ['up']
                        }
                        swipeRequirementType="velocity"
                        swipeThreshold={1.6}
                        className={`card ${swiping ? 'card-swiping' : ''} ${
                            toggle ? 'toggled' : ''
                        }`}
                    >
                        <RecipeCard
                            user={user}
                            title={homeData.recipe_name}
                            data={homeData}
                            cookTime={`Cook Time: ${homeData.cook_time}`}
                            prepTime={`Prep Time: ${homeData.prep_time}`}
                            servings={`Servings: ${homeData.servings}`}
                            cuisine={`Cuisine: ${homeData.cuisine}`}
                            image_path={homeData.image_path}
                            toggle={toggle}
                        />
                    </TinderCard>
                )}
            </div>
            <div className="swipeButtonContainer">
                <SwipingButton
                    clickHandler={swipeLeft}
                    swiping={swiping}
                    text="Dislike"
                    cname="left"
                    toggle={toggle}
                />
                <SwipingButton
                    clickHandler={swipeDown}
                    swiping={swiping}
                    text="Pass"
                    cname="down"
                    toggle={toggle}
                />
                <SwipingButton
                    clickHandler={swipeRight}
                    swiping={swiping}
                    text="Add"
                    cname="right"
                    toggle={toggle}
                />
            </div>
        </div>
    );
}

export default RecipeCardContainer; 