import React from 'react'
import HeartContainer from '../containers/heartContainer'
import LearnMoreContainer from '../containers/learnMoreContainer'
import AddContainer from '../containers/addContainer'

function RecipeList( { title, time, raiting, data } ) {

    return (
        <div className="recipeListContainer">
            <HeartContainer cname="listHeart" />
            <h5 className="listName">{title}</h5>
            <h5 className="time">Time: {time}</h5>
            <h5 className="raiting">Raiting: {raiting}</h5>
            <LearnMoreContainer cname="listLearnMore" data={data} />
            <AddContainer className/>
        </div>
    )
}

export default RecipeList;