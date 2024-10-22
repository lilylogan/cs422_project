import React, { Component, useState } from 'react'
import Heart from '../components/heart'

function HeartContainer() {

    const[fill, setFill] = useState(false);

    const handleClick = () => {
        setFill(!fill);

        // add to liked recipe list
    }

    return (
        <Heart onClick={handleClick} fill={fill}/>
    )
}

export default HeartContainer;