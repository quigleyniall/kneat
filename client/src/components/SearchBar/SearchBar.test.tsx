import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';
import { checkProps } from '../../utils/test';

const props = {
  onSearchChange: jest.fn(),
  onPress: jest.fn(),
  searching: true,
  searchTerm: ''
};

const wrapper = shallow(<SearchBar {...props} />);

test('renders without error', () => {
  expect(wrapper.length).toBe(1);
});

test('renders text input', () => {
  expect(
    wrapper
      .children()
      .first()
      .dive()
      .find('input').length
  ).toBe(1);
});

test('renders search button', () => {
  expect(
    wrapper
      .children()
      .last()
      .dive()
      .find('button').length
  ).toBe(1);
});

test('check props sent to searchbar', () => {
  const expectedProps = {
    onSearchChange: jest.fn(),
    onPress: jest.fn(),
    searching: true,
    searchTerm: ''
  };
  checkProps(SearchBar, expectedProps);
});
