import React from 'react';
import { shallow } from 'enzyme';
import SideBar from './SideBar';

const wrapper = shallow(<SideBar />);

test('renders without error', () => {
  expect(wrapper.length).toBe(1);
});
