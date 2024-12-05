/* 
deleteContainer.js
Description: Container that prompts the user if they really want to delete a recipe, and
sends information to delete said recipe to backend as well as notifies user that recipe has 
been deleted as requested.
Date: November 29th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React, { useState } from 'react'
import DeleteButton from '../components/delete'
import Swal from 'sweetalert2'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function DeleteButtonContainer({ data, user, setGenerate }) {
  const [error, setError] = useState('');

  const handleLike = async (action) => {
    try {
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

    const clickHandler = async () => {
        try {
            const result = await Swal.fire({
              title: "Are you sure you want to delete Recipe Name",
              html: "This process can <b>NOT</b> be undone!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Confirm",
              cancelButtonText: "Cancel",
              reverseButtons: true,
              background: '#FAF5F0',
              color: '#3B2A1D',
              iconColor: '#95340A',
              customClass: {
                confirmButton: 'custom-confirm-button',
                cancelButton: 'custom-cancel-button',
              },
            });
    
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Meal Removed from your Liked List",
                      icon: "success",
                      showConfirmButton: false,
                      showCloseButton: true,
                      background: '#FAF5F0',
                      color: '#3B2A1D',
                      iconColor: '#95340A',
                      backdrop: false,
                      timer: 2500,
                      timerProgressBar: true,
                      position: 'top-left',
                      customClass: {
                        popup: 'deleteAlert',
                      },
                })
                // delete from liked list
                await handleLike("unheart")
                setGenerate(true);
        } 
        } catch (error) {
            console.error('Delete account error:', error);
            Swal.fire({
                title: "Error",
                text: "Failed to delete account. Please try again.",
                icon: "error",
                background: '#FAF5F0',
                color: '#3B2A1D',
                iconColor: '#95340A',
            });
        }
    }

    return (
        <DeleteButton onClick={clickHandler} />
    )
}

export default DeleteButtonContainer;