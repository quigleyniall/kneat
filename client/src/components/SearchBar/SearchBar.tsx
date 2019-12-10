import React from 'react';
import Button from '../Button/Button';
import TextInput from '../TextInput';
import './SearchBar.scss';
import PropTypes from 'prop-types';

interface SearchBarProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPress: () => void;
  searching: boolean;
  searchTerm: string;
  searchBtnText: string;
}

const SearchBar = ({
  onSearchChange,
  onPress,
  searching,
  searchTerm,
  searchBtnText
}: SearchBarProps) => {
  const btnClass = searching || searchTerm.length === 0 ? 'disabled' : 'search';
  return (
    <div className="flex">
      <TextInput
        data-test="text-input"
        name="searchBar"
        type="text"
        handleChange={onSearchChange}
        value={searchTerm}
      />
      <Button
        data-test="search-button"
        text={searchBtnText}
        onPress={onPress}
        btnClass={btnClass}
        disabled={searching || searchTerm.length === 0}
      />
    </div>
  );
};

SearchBar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  searching: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired
};

export default SearchBar;
