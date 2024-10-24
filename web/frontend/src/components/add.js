import React from "react";

function Add({ onClick }) {

    return (
        <div>
            <button onClick={onClick} className="add">Add</button>
        </div>
    )
}

export default Add;