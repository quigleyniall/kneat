import React from 'react';
import AddRemoveFromTable from './AddRemoveFromTable';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../utils/test';

test('renders without error & renders correct amount of children', () => {
  const props = {
    onCheckboxChange: jest.fn(),
    checkBoxActive: ['name'],
    tableHeaders: ['name', 'model']
  };
  const wrapper = shallow(<AddRemoveFromTable {...props} />);
  expect(wrapper.length).toBe(1);

  const dropdown = findByTestAttr(wrapper, 'dropdown').dive();
  const checkBox = findByTestAttr(dropdown, 'dropdown-info').children();

  expect(checkBox.length).toBe(2);
});
