import React from 'react'
import HeartContainer from '../containers/heartContainer'
import LearnMoreContainer from '../containers/learnMoreContainer'
import AddContainer from '../containers/addContainer'
import DeleteButtonContainer from '../containers/deleteContainer'

function RecipeList( { title, time, cuisine, data } ) {


    return (
        <div className="recipeListContainer">
            <HeartContainer cname="listHeart" />
            <h5 className="listName">{title}</h5>
            <h5 className="time">Time: {time}</h5>
            <h5 className="cuisineList">cuisine: {cuisine}</h5>
            {data ? (<LearnMoreContainer cname="listLearnMore" data={data} />) :
            (<div>
                Loading. . .
            </div>)}
            <AddContainer className/>
            <DeleteButtonContainer />
        </div>
    )
}

export default RecipeList;