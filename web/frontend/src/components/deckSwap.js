function DeckSwap({ toggle, handleToggle }) {
    return (
        <div className="toggleContainer">
            <h5 className="recipeNameCard">Discovery</h5>
            <div className={`slider ${toggle ? 'toggled' : ''}`} onClick={handleToggle}>
                <div className="circle"></div>
            </div>
            <h5 className="recipeNameCard">Liked</h5>
        </div>

    );
}

export default DeckSwap