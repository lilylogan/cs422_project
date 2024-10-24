import React from 'react'
import HeartContainer from '../containers/heartContainer';
import LearnMoreContainer from '../containers/learnMoreContainer';

function RecipeCard({ title }) {
    return (
        <div>
            <h3 className="recipeNameCard">
                Recipe {title}
                <HeartContainer cname="heart"/>
            </h3>
            <p>Image of Recipe</p>
            <LearnMoreContainer cname="learnMore"/>
        </div>
    );
}

export default RecipeCard;