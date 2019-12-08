import React from 'react';
import { shallow } from 'enzyme';
import TableWrapper from './TableWrapper';
import { findByTestAttr } from '../../utils/test';

const sortMock = jest.fn();

const props = {
  children: (
    <tr>
      <td>Hello</td>
    </tr>
  ),
  headers: { name: 'jeff', model: 'bmw' },
  sortResult: sortMock
};

const wrapper = shallow(<TableWrapper {...props} />);
const tableHeader = findByTestAttr(wrapper, 'table-header');

test('renders without error', () => {
  expect(wrapper.length).toBe(1);
});

test('renders both headers', () => {
  expect(tableHeader.length).toBe(2);
  expect(tableHeader.first().text()).toBe('Name');
  expect(tableHeader.at(1).text()).toBe('Model');
});

test('sortResult function is run when header clicked', () => {
  tableHeader.first().simulate('click');
  expect(sortMock.mock.calls.length).toBe(1);
  expect(sortMock.mock.calls[0][0]).toBe('name');
});

test('renders children', () => {
  const tableChildren = findByTestAttr(wrapper, 'table-children');
  expect(
    tableChildren
      .children()
      .children()
      .text()
  ).toBe('Hello');
});
