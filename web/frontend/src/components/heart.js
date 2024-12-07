/*
heart.js
Description: Component for the heart used to like recipes. 
Date: October 19th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React from 'react'

function Heart({ onClick, liked, cname }) {
    // this function holds the html for the heart button
    return (
        <button onClick={onClick} className={`${cname} ${liked === "heart" ? 'liked' : ''}`}>♥</button>
    )
}

export default Heart;