import React from 'react';
import Button from '../Button/Button';
import TextInput from '../TextInput';
import './SearchBar.scss';

interface SearchBarProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPress: () => void;
  searching: boolean;
  searchTerm: string;
}

const SearchBar = ({
  onSearchChange,
  onPress,
  searching,
  searchTerm
}: SearchBarProps) => {
  const btnClass = searching || searchTerm.length === 0 ? 'disabled' : 'search';
  return (
    <div className="flex">
      <TextInput name="searchBar" type="text" handleChange={onSearchChange} />
      <Button
        text="Calculate Number of Re-Supplies"
        onPress={onPress}
        btnClass={btnClass}
        disabled={searching || searchTerm.length === 0}
      />
    </div>
  );
};

export default SearchBar;
