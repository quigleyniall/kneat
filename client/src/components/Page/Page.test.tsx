import React from 'react';
import { shallow } from 'enzyme';
import Page from './Page';
import { checkProps, findByTestAttr } from '../../utils/test';

const props = {
  children: <div>Main Information</div>,
  navHeader: 'Welcome to the page',
  analysisLinks: ['Star Ships']
};

const wrapper = shallow(<Page {...props} />);

test('renders without error', () => {
  expect(wrapper.length).toBe(1);
});

test('render the nav', () => {
  const nav = findByTestAttr(wrapper, 'nav');
  expect(nav.length).toBe(1);
});

test('renders the side bar', () => {
  const sideBar = findByTestAttr(wrapper, 'side-bar');
  expect(sideBar.length).toBe(1);
});

test('renders the child components', () => {
  const childWrapper = findByTestAttr(wrapper, 'page-children');
  expect(childWrapper.children().text()).toBe('Main Information');
});

test('check props sent to page', () => {
  checkProps(Page, props);
});
