
/*
card.js
Description: Front end display of the recipe cards used in the home page.
Date: October 9th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React, { useState } from 'react'
import HeartContainer from '../containers/heartContainer';
import LearnMoreContainer from '../containers/learnMoreContainer';
import Tag from './tag';
import wallyWale from '../assets/wally_wale.jpg'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function RecipeCard({ user, title, cookTime, prepTime, servings, cuisine, data, image_path, toggle}) {
    
    const fullImagePath = image_path ? `${BACKEND_URL}/${image_path}` : wallyWale;
    return (
        <div>
            <h3 className="recipeNameCard">
                {title}
                <HeartContainer cname="heart" user={user} id={data.recipeID} start={toggle ? "heart" : "unheart"} />
            </h3>
            <div className="frameContainer">
                <div className={`imageFrame ${toggle ? 'toggled' : ''}`} >
                    <img src={fullImagePath} alt="Recipe Name" className="cardImage"/>
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