/* 
addContainer.js
Description: Handles the recipe adding to meal planner and pops up a notification to the user that meal has successfully been added.
Date: November 20th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React, { useState } from "react";
import Add from "../components/add";
import Swal from 'sweetalert2'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function AddContainer({ data, user }) {
    // this function contains all the logic for the addContainer and passes it to the Add Component

    const [error, setError] = useState('');

    const handleSubmit = async (action) => {
        // this function handles adding a meal to a users meal plan
        // through the add button
        
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

    const clickHandler = () => {
        // This function sets of the confirmation alert and sends the add to the backend


        // fire alert on success
        Swal.fire({
            title: "Meal Added to Meal Plan",
              icon: "success",
              showConfirmButton: false,
              showCloseButton: true,
              background: '#FAF5F0',
              color: '#3B2A1D',
              iconColor: '#4A7B32',
              backdrop: false,
              timer: 1750,
              timerProgressBar: true,
              position: 'top-left',
              customClass: {
                popup: 'addAlert',
              },
        })

        // submit the add to the backend
        handleSubmit("add")
    }

    return (
        <Add onClick={clickHandler} />
    )
}

export default AddContainer;