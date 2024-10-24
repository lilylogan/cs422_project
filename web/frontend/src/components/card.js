import React from 'react'
import HeartContainer from '../containers/heartContainer';
import LearnMoreContainer from '../containers/learnMoreContainer';

function RecipeCard({ title }) {
    return (
        <div>
            <h3 className="recipeNameCard">
                Recipe {title}
                <HeartContainer />
            </h3>
            <p>Image of Recipe</p>
            <LearnMoreContainer />
        </div>
    );
}

export default RecipeCard;