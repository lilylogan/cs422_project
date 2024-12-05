/* 
swipingButtons.js
Description: 
Date: December 2nd, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function SwipingButton({ text, cname, clickHandler, swiping }) {
    return (
        <>
        {cname === 'right' && (
            <KeyboardArrowRightIcon onClick={clickHandler} className="swipe" sx = {{fontSize: 108}} />
        )}
        {cname === 'left' && (
            <KeyboardArrowLeftIcon onClick={clickHandler} className="swipe" sx = {{fontSize: 108}} />
        )}
        {cname === 'down' && (
            <KeyboardArrowDownIcon onClick={clickHandler} className="swipe" sx = {{fontSize: 108}} />
        )}
        </>
    );
}

export default SwipingButton;