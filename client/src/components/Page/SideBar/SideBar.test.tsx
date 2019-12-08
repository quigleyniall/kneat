import React from 'react';
import { shallow } from 'enzyme';
import SideBar from './SideBar';
import { findByTestAttr } from '../../../utils/test';

const wrapper = shallow(<SideBar analysisLinks={['Star ships', 'People']} />);

test('renders without error', () => {
  expect(wrapper.length).toBe(1);
});

test('renders correct number of links', () => {
  const analysisGroup = findByTestAttr(wrapper, 'analysis-container');
  expect(analysisGroup.children().length).toBe(2);
});

test('renders correct text', () => {
  const analysisGroup = findByTestAttr(wrapper, 'analysis-container');
  expect(
    analysisGroup
      .children()
      .first()
      .children()
      .text()
  ).toBe('Star ships');
});
