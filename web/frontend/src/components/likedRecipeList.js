/*
likedRecipeList.js
Description: Component for the front end of the likedRecipes page, formats the recipes and displays to users with learn more buttons available.
Date: Novemeber 24th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React from 'react'
import HeartContainer from '../containers/heartContainer'
import LearnMoreContainer from '../containers/learnMoreContainer'
import AddContainer from '../containers/addContainer'
import DeleteButtonContainer from '../containers/deleteContainer'

function RecipeList( { title, time, cuisine, data, user, setGenerate } ) {


    return (
        <div className="recipeListContainer">
            <h5 className="listName">{title}</h5>
            <h5 className="time">Time: {time}</h5>
            <h5 className="cuisineList">cuisine: {cuisine}</h5>
            {data ? (<LearnMoreContainer cname="listLearnMore" data={data} />) :
            (<div>
                Loading. . .
            </div>)}
            <AddContainer user={user} data={data} />
            <DeleteButtonContainer data={data} user={user} setGenerate={setGenerate}/>
        </div>
    )
}

export default RecipeList;