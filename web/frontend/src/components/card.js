import React from 'react'
import HeartContainer from '../containers/heartContainer';
import LearnMoreContainer from '../containers/learnMoreContainer';
import Tag from './tag';
import wallyWale from '../assets/wally_wale.jpg'

function RecipeCard({ title, cookTime, prepTime, servings, cuisine, data }) {
    return (
        <div>
            <h3 className="recipeNameCard">
                {title}
                <HeartContainer cname="heart"/>
            </h3>
            <div className="frameContainer">
                <div className="imageFrame">
                    <img src={wallyWale} alt="Recipe Name" className="cardImage"/>
                </div>
            </div>
            <div className = "tagContainer">
                <Tag className="tagCard" text={cookTime} />
                <Tag className="tagCard" text={prepTime} />
                <Tag className="tagCard" text={servings} />
                <Tag className="tagCard" text={cuisine} />
            </div>
            <LearnMoreContainer cname="learnMore" data={data} />
        </div>
    );
}

export default RecipeCard;