/* 
deckSwapContainer.js
Description: Container for handling deck swaping on toggle switch.
Date: November 17th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import DeckSwap from '../components/deckSwap'

function DeckSwapContainer({ toggle, setToggle }) {
    // this funciton holds the logic for the deck toggle and holds the deckswap component html

    const handleToggle = () => {
        // toggles the deck to the other form either discovery or liked
        setToggle(!toggle);
    };

    return (
        <DeckSwap handleToggle={handleToggle} toggle={toggle} />
    )
}

export default DeckSwapContainer