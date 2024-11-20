import React from 'react'

function Heart({ onClick, liked, cname }) {
    return (
        <button onClick={onClick} className={`${cname} ${liked === "heart" ? 'liked' : ''}`}>♥</button>
    )
}

export default Heart;