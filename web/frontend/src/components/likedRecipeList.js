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
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';


function RecipeList( { title, time, cuisine, data, user, setGenerate } ) {
    // This function holds the html for the listing of a recipe in the liked list
    // and all the containers it holds


    return (
        <div className="recipeListContainer">
            <RestaurantMenuIcon className= "forks" sx = {{fontSize: 65}}/>
            {/*<HeartContainer cname="listHeart" />*/}
            <h5 className="listName">{title}</h5>
            <h5 className="time">Time: {time}</h5>
            <h5 className="cuisineList">cuisine: {cuisine}</h5>
            {data ? (<LearnMoreContainer cname="listLearnMore" data={data} />) :
            (<div>
                Loading. . .
            </div>)}
            <AddContainer user={user} data={data} />
            <DeleteButtonContainer data={data} user={user} setGenerate={setGenerate}/>
            {/*<DeleteButtonContainer data={data} user={user} setGenerate={setGenerate}/>*/}
        </div>
    )
}

export default RecipeList;