import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { findByTestAttr } from './utils/test';

describe('Home Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test('renders without crashing', () => {
    const app = findByTestAttr(wrapper, 'app');
    expect(app.length).toBe(1);
  });

  test('renders the searchbar', () => {
    const searchBar = findByTestAttr(wrapper.dive(), 'search-bar');
    expect(searchBar.length).toBe(1);
  });

  test('renders the results', () => {
    const results = findByTestAttr(wrapper.dive(), 'results');
    expect(results.length).toBe(1);
  });
});
