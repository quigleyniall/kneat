import React from 'react';
import TextInput from './TextInput';
import { shallow } from 'enzyme';
import { checkProps } from '../../utils/test';

const onChangeMock = jest.fn();

const props = {
  name: 'model',
  type: 'text',
  handleChange: onChangeMock,
  value: ''
};

const wrapper = shallow(<TextInput {...props} />);

test('check props sent to input', () => {
  const expectedProps = {
    name: 'model',
    type: 'text',
    handleChange: onChangeMock
  };
  checkProps(TextInput, expectedProps);
});

test('renders without error', () => {
  expect(wrapper.length).toBe(1);
});

test('handlChange function fired onChange', () => {
  const changeEvent = { target: { value: 'hello' } };
  wrapper.simulate('change', changeEvent);

  expect(onChangeMock.mock.calls.length).toBe(1);
  expect(onChangeMock).toBeCalledWith(changeEvent);
});
