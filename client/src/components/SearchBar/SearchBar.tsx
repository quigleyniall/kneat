import React from 'react';

interface SearchBarProps {
  onSearchChange: (e) => void;
  onPress: () => void;
}

const SearchBar = ({ onSearchChange, onPress }: SearchBarProps) => (
  <div data-test="search-bar">
    <input
      name="searchBar"
      className="search"
      type="text"
      onChange={onSearchChange}
    />
    <button onClick={onPress}>Search</button>
  </div>
);

export default SearchBar;
