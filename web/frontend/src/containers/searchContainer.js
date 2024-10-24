import React, { useState } from 'react'
import SearchBar from '../components/searchBar'

function SearchBarContainer() {
    const [item, setItem] = useState('');

    const handleChange = (e) => {
        setItem(e.target.value);
    }

    return (
        <SearchBar item={item} handleChange={handleChange} />
    )
    };

    export default SearchBarContainer;