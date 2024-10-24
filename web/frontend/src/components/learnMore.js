import React from 'react'

function LearnMore({ onClick, cname }) {

    return (
        <div>
            <button onClick={onClick} className={ cname }>Learn More</button>
        </div>
    );
}

export default LearnMore;