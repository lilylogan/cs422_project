import React from 'react'

function Heart({ onClick, liked }) {
    return (
        <button onClick={onClick} className={`heart ${liked ? 'liked' : ''}`}>♥</button>
    )
}

export default Heart;