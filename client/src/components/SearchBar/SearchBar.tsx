import React from 'react';

interface SearchBarProps {
  onSearchChange: (e) => void;
  onPress: () => void;
  setNoResults: () => void;
}

const SearchBar = ({
  onSearchChange,
  onPress,
  setNoResults
}: SearchBarProps) => (
  <div data-test="search-bar">
    <input
      name="searchBar"
      className="search"
      type="text"
      onChange={onSearchChange}
    />
    <button onClick={onPress}>Search</button>
    <button onClick={setNoResults}>Result per page</button>
  </div>
);

export default SearchBar;
