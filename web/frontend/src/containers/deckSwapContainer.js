/* 
deckSwapContainer.js
Description: Container for handling deck swaping on toggle switch.
Date: November 17th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React, { useState } from 'react'
import DeckSwap from '../components/deckSwap'

function DeckSwapContainer({ toggle, setToggle }) {

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return (
        <DeckSwap handleToggle={handleToggle} toggle={toggle} />
    )
}

export default DeckSwapContainer