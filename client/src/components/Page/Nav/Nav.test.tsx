import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';
import { findByTestAttr } from '../../../utils/test';

const wrapper = shallow(<Nav navHeader="hello" />);

test('renders without error', () => {
  expect(wrapper.length).toBe(1);
});

test('renders header and correct text', () => {
  const header = findByTestAttr(wrapper, 'heading');
  expect(header.length).toBe(1);
  expect(header.dive().text()).toBe('hello');
});
