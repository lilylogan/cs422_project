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
    const [error, setError] = useState('');

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

    const clickHandler = () => {
        // at to meal planner

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
        handleSubmit("add")
    }

    return (
        <Add onClick={clickHandler} />
    )
}

export default AddContainer;