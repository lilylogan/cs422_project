import React, { useState } from 'react'
import DeckSwapContainer from '../containers/deckSwapContainer';
import RecipeCardContainer from '../containers/cardConatiner';

function Home() {
    const [toggle, setToggle] = useState(false);

    return (
        <div>
            <DeckSwapContainer toggle={toggle} setToggle={setToggle} />
            <RecipeCardContainer toggle={toggle} stToggle={setToggle} />
        </div>
    )
}

export default Home;

