import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const SearchBarContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
});

const SearchButton = styled(Button)({
  marginLeft: '8px',
});

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <SearchBarContainer>
      <TextField
        label="Search Products and Items"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SearchButton variant="contained" color="primary" onClick={handleSearch}>
        Search
      </SearchButton>
    </SearchBarContainer>
  );
}

export default SearchBar;
