import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function help({ onClick }) {
    return (
        <div className="helpContainer">
            <HelpOutlineIcon onClick={onClick} className="help">?</HelpOutlineIcon>
        </div>
    )
}

export default help