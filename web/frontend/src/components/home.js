import React from 'react'
import DeckSwap from "./deckSwap"
import RecipeCardContainer from '../containers/cardConatiner';

function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <DeckSwap />
            <RecipeCardContainer />
        </div>
    )
}

export default Home;

