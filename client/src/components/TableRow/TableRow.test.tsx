import React from 'react';
import { shallow } from 'enzyme';
import TableRow from './TableRow';

const rowData = {
  manufacturer: 'tesla',
  model: 'model 3'
};

const wrapper = shallow(<TableRow rowData={rowData} />);

test('renders without error', () => {
  expect(wrapper.length).toBe(1);
});

test('renders rowData', () => {
  expect(wrapper.children().length).toBe(2);
});

test('renders correct values', () => {
  expect(
    wrapper
      .children()
      .first()
      .text()
  ).toBe('tesla');

  expect(
    wrapper
      .children()
      .last()
      .text()
  ).toBe('model 3');
});
