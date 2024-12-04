/* 
swipingButtons.js
Description: 
Date: December 2nd, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React from 'react'

function SwipingButton({ text, cname, clickHandler, swiping }) {
    return (
        <button onClick={clickHandler} disabled={swiping} className={cname}>{text}</button>
    )
}

export default SwipingButton;