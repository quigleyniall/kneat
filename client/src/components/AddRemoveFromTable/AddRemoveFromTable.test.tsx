import React from 'react';
import AddRemoveFromTable from './AddRemoveFromTable';
import { shallow } from 'enzyme';

test('renders without error', () => {
  const props = {
    onCheckboxChange: jest.fn(),
    checkBoxActive: ['name'],
    tableHeaders: ['name', 'model']
  };
  const wrapper = shallow(<AddRemoveFromTable {...props} />);
  expect(wrapper.length).toBe(1);
});
