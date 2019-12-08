import React from 'react';
import { shallow } from 'enzyme';
import Heading from './Heading';

const wrapper = shallow(<Heading text="hello there" />);

test('renders without error', () => {
  expect(wrapper.length).toBe(1);
});

test('displays correct text', () => {
  expect(wrapper.text()).toBe('hello there');
});
