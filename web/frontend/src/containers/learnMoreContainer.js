import React from 'react'
import LearnMore from '../components/learnMore'

function LearnMoreContainer({ cname }) {

    const clickHandler = () => {
        alert("recipe information will be displayed here")
    }

    return (
        <LearnMore onClick={clickHandler} cname={cname} />
    )
}

export default LearnMoreContainer;