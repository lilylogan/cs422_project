import React from 'react'

function Heart({ onClick, fill }) {
    return (
        <button onClick={onClick}>♥</button>
    )
}

export default Heart;