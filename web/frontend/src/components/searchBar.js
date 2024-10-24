import React from 'react'
import {ReactComponent as MagnifyingGlass } from '../assets/magnifying-glass-svgrepo-com.svg'

function SearchBar({ item, handleChange }) {
    return (
        <div className="searchBarContainer">
        <div className="searchBar">
            <div className> <MagnifyingGlass className="searchIcon"/></div>
            <input
                type="search"
                placeholder="Search . . . "
                value={item}
                onChange={handleChange}
            />
        </div>
        </div>
    )
}

export default SearchBar;