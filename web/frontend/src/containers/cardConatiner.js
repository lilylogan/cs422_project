import React, { useState, useRef } from 'react'
import RecipeCard from '../components/card';
import TinderCard from 'react-tinder-card'
import SwipingButton from '../components/swipingButtons';

function RecipeCardContainer() {

    const [index, setIndex] = useState(1);
    const cardRef = useRef(null);
    const [swiping, setSwiping] = useState(false);


    const onSwipe = (direction) => {
        //cardRef.current.style.transitionDuration = '0.3s';
        if (!swiping) {
            setSwiping(true)
            if (direction === 'left') {
                console.log("adding to disliked")
            }
            else if (direction === 'right') {
                console.log("adding to meal plan")
            }
        }
    }

    const onCardLeftScreen = (direction) => {
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


    return (
        <div>
            <div className="cardContainer">
            {index > 0 ? (
            <TinderCard ref={cardRef} key={index} onSwipe={onSwipe} onCardLeftScreen={onCardLeftScreen} flickOnSwipe={true} preventSwipe={swiping ? ['up', 'left', 'right', 'down'] : ['up']} swipeRequirementType='velocity' swipeThreshold={1.60} className={`card ${swiping ? 'card-swiping' : ''}`}>
                <RecipeCard title={index} cookTime="cookTime: 20min" prepTime="prepTime: 20min" servings="servings: 2" cuisine="cuisine: WALE" />
            </TinderCard>
            ) : (<div>
                    No more Cards!
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