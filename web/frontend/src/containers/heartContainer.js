/* 
heartContainer.js
Description: Holds logic for what the heart should look like based on status as a
liked or unliked recipe, and changes upon clicking the heart. 
Date: November 20th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React, { useState, useEffect } from 'react'
import Heart from '../components/heart'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


function HeartContainer({ cname, data, user, start }) {
    const [error, setError] = useState('');
    
    useEffect(() => {
        setLiked(start);
      }, [start]);


    const handleLike = async (action) => {
        try {
            console.log("like")
            // send request
            console.log("Sending request to backend");
            const response = await fetch(`${BACKEND_URL}/sendNewRecipe`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({user_action: action, recipe_id: data.recipeID, user_id: user.userID}),
            });

            // check response
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Action Failed')
            }

            // parse successful response
            const responseData = await response.json()
            console.log("Response data:", responseData)
        } 
        catch(err) {
            setError(err.message)
        }
    };

    const[liked, setLiked] = useState(start);

    const handleClick = () => {
        console.log("click")
        setLiked((prevLiked) => {
            let newLiked;
            if (prevLiked === "unheart") {
                newLiked = "heart"

                // add to liked list
                handleLike("heart")
            }
            else {
                newLiked = "unheart"

                // remove from liked list
                handleLike("unheart")
            }
            return newLiked;
        })
    }

    return (
        <Heart onClick={handleClick} liked={liked} cname={cname} />
    )
}

export default HeartContainer;