import React from 'react'
import HeartContainer from '../containers/heartContainer'
import LearnMoreContainer from '../containers/learnMoreContainer'
import AddContainer from '../containers/addContainer'
import DeleteButtonContainer from '../containers/deleteContainer'

function RecipeList( { title, time, cuisine, data, user, setGenerate } ) {


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
            <AddContainer user={user} data={data} />
            <DeleteButtonContainer data={data} user={user} setGenerate={setGenerate}/>
        </div>
    )
}

export default RecipeList;