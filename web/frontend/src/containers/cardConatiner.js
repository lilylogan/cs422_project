import React, { useState } from 'react'
import RecipeCard from '../components/card';
import TinderCard from 'react-tinder-card'


function RecipeCardContainer() {

    const [index, setIndex] = useState(1);


    const onSwipe = (direction) => {
        if (direction === 'left') {
            console.log("adding to disliked")
        }
        else if (direction === 'right') {
            console.log("adding to meal plan")
        }
    }

    const onCardLeftScreen = (direction) => {
        setIndex((prev)=> {
            return prev + 1;
        })
    }


    return (
        <div className="cardContainer">
            {index > 0 ? (
            <TinderCard key={index} onSwipe={onSwipe} onCardLeftScreen={onCardLeftScreen} flickOnSwipe={true} preventSwipe={['up']} className="card">
                <RecipeCard title={index} />
            </TinderCard>
            ) : (<div>
                    No more Cards!
                 </div>)}
        </div>
    );
}

export default RecipeCardContainer; 