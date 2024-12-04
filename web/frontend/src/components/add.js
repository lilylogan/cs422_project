/*
add.js
Description: Component for add button.
Date: October 9th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React from "react";

function Add({ onClick }) {

    return (
        <div>
            <button onClick={onClick} className="add">Add</button>
        </div>
    )
}

export default Add;