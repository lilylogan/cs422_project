import React from 'react'
import LearnMore from '../components/learnMore'

function LearnMoreContainer() {

    const clickHandler = () => {
        alert("recipe information will be displayed here")
    }

    return (
        <LearnMore onClick={clickHandler} />
    )
}

export default LearnMoreContainer;