/*
delete.js
Description: Component for delete button. Used in liked page.
Date: October 9th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function DeleteButton({ onClick }) {
    // this function holds the html for the delete button
    return (
        <div>
            <DeleteForeverIcon onClick={onClick} className="delete" sx = {{fontSize: 60}} />
        </div>
    )
}

export default DeleteButton;