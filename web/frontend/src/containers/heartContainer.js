import React, { useState } from 'react'
import Heart from '../components/heart'

function HeartContainer({ cname }) {

    const[liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);

        // add to liked recipe list
    }

    return (
        <Heart onClick={handleClick} liked={liked} cname={cname} />
    )
}

export default HeartContainer;