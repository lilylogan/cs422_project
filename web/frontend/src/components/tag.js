/* 
tag.js
Description: A component for tags (such as cusine, time, etc.) to be added to the meal card.
Date: November 2nd, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React from 'react'

function Tag( {text} ) {
    // this function holds the html for the info tags (cuisine, cook time)
    return (<div className="tagCard">
        {text}
    </div>);
}

export default Tag;