/*
deckSwap.js
Description: Component to swap between the Discovery and Liked Deck, used in the home page.
Date: October 7th, 2024
Inital Author: Will Marceau
Modified By: 
*/
function DeckSwap({ toggle, handleToggle }) {
    return (
        <div className="toggleContainer">
            <h5 className="recipeNameCard">Discovery Deck</h5>
            <div className={`slider ${toggle ? 'toggled' : ''}`} onClick={handleToggle}>
                <div className="circle"></div>
            </div>
            <h5 className="recipeNameCard">Liked Deck</h5>
        </div>

    );
}

export default DeckSwap