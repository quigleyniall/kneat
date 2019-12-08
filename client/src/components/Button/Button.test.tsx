import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import { findByTestAttr, checkProps } from '../../utils/test';

const onPressMockFn = jest.fn();

const defaultProps = {
  onPress: onPressMockFn,
  text: 'Click me!',
  btnClass: 'search',
  disabled: false
};

const setup = (props = {}) => {
  const setUpProps = { ...defaultProps, ...props };
  return shallow(<Button {...setUpProps} />);
};

describe('button test', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without error', () => {
    expect(wrapper.length).toBe(1);
  });

  test('runs onPress function', () => {
    wrapper.simulate('click');
    const onPressMockFnCallCount = onPressMockFn.mock.calls.length;
    expect(onPressMockFnCallCount).toBe(1);
  });

  test('renders text', () => {
    expect(wrapper.text()).toBe(defaultProps.text);
  });

  test('loads appropiate class', () => {
    expect(wrapper.hasClass('btn-search')).toBe(true);
  });

  test('check props sent to button', () => {
    const expectedProps = {
      onPress: onPressMockFn,
      text: 'Click me!',
      btnClass: 'search',
      disabled: false,
      type: 'button'
    };
    checkProps(Button, expectedProps);
  });
});
