/*
add.js
Description: Component for add button.
Date: October 9th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React from "react";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function Add({ onClick }) {

    return (
        <div>
            {/*<button onClick={onClick} className="add">Add</button>*/}
            <NoteAddIcon onClick={onClick} className="addIcon" sx={{fontSize: 55}} />
        </div>
    )
}

export default Add;