/* 
searchBar.js
Description: A searchbar component to be used in the liked page to search for liked recipes.
Date: October 28th, 2024
Inital Author: Will Marceau
Modified By:
*/
import React from 'react'
import {ReactComponent as MagnifyingGlass } from '../assets/magnifying-glass-svgrepo-com.svg'

function SearchBar({ item, handleChange }) {
    // This function is not being used anymore
    // but it holds the html for the scrapped searchBar
    return (
        <div className="searchBarContainer">
        <div className="searchBar">
            <div> <MagnifyingGlass className="searchIcon"/></div>
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