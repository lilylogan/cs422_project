import React from 'react'
import HeartContainer from '../containers/heartContainer';
import LearnMoreContainer from '../containers/learnMoreContainer';

function RecipeCard({ title }) {
    return (
        <div>
            <h3>
                Recipe {title}
            </h3>
            <HeartContainer />
            <p>Image of Recipe</p>
            <LearnMoreContainer />
        </div>
    );
}

export default RecipeCard;