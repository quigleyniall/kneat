import React from 'react';
import Checkbox from './Checkbox';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../utils/test';

const onChangeMock = jest.fn();

const props = {
  text: 'max_speed',
  name: 'starShipHeaders',
  onCheckboxChange: onChangeMock,
  checked: false
};

const setup = () => shallow(<Checkbox {...props} />);

describe('test checkbox', () => {
  let wrapper;
  let checkboxGroupElement: any;
  let checkboxElement: any;

  beforeEach(() => {
    wrapper = setup();
    checkboxGroupElement = findByTestAttr(wrapper, 'checkbox-group');
    checkboxElement = findByTestAttr(wrapper, 'checkbox');
  });

  test('renders without error', () => {
    expect(checkboxGroupElement.length).toBe(1);
  });

  test('text gets formatted', () => {
    expect(checkboxGroupElement.text()).toBe('Max speed');
  });

  test('onChangebox fn is called when checkbox is clicked', () => {
    checkboxElement.simulate('change');
    expect(onChangeMock.mock.calls.length).toBe(1);
  });
});
