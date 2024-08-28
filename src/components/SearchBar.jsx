import React, { useState } from 'react';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";

function SearchBar({ onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Perform search on button click
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/search`, {
        params: { query: searchTerm }
      });
      onSearchResults(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div>
      <div className='searchbar'>
        <input
          type="text"
          placeholder='Search furniture'
          className='search'
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className='search-button' onClick={handleSearch}><CiSearch /></button>
      </div>
    </div>
  );
}

export default SearchBar;
