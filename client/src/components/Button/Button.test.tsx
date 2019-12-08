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
  let wrapper;
  let buttonElement: any;

  beforeEach(() => {
    wrapper = setup();
    buttonElement = findByTestAttr(wrapper, 'button');
  });

  test('renders without error', () => {
    expect(buttonElement.length).toBe(1);
  });

  test('runs onPress function', () => {
    buttonElement.simulate('click');
    const onPressMockFnCallCount = onPressMockFn.mock.calls.length;
    expect(onPressMockFnCallCount).toBe(1);
  });

  test('renders text', () => {
    expect(buttonElement.text()).toBe(defaultProps.text);
  });

  test('loads appropiate class', () => {
    expect(buttonElement.hasClass('btn-search')).toBe(true);
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
