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