/*
help.js
Description: Component that when clicked brings up the help container on the home page, to help users learn how to use the main app.
Date: November 21st, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function help({ onClick }) {
    // this function holds the html for the help button
    return (
        <div className="helpContainer">
            <HelpOutlineIcon onClick={onClick} className="help" sx = {{fontSize: 60}} />
        </div>
    )
}

export default help