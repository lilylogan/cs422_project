import React from 'react'

function LearnMore({ onClick }) {

    return (
        <div>
            <button onClick={onClick} className="learnMore">Learn More</button>
        </div>
    );
}

export default LearnMore;