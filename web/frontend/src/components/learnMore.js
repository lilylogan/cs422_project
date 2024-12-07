/*
learnMore.js
Description: Component that displays a Learn More button
Date: October 12th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React from 'react'

function LearnMore({ onClick, cname }) {
// this function holds the html for the LearnMore button
    return (
        <div>
            <button onClick={onClick} className={ cname }>Learn More</button>
        </div>
    );
}

export default LearnMore;