import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function DeleteButton({ onClick }) {
    return (
        <div>
            <DeleteForeverIcon onClick={onClick} className="delete" sx = {{fontSize: 60}} />
        </div>
    )
}

export default DeleteButton;