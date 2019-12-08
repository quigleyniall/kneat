import React from 'react';
import DropDown from './Dropdown';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../utils/test';

const defaultProps = {
  btnText: 'Dropdown button',
  btnClass: 'btn',
  children: <h1>Hi there</h1>
};

const setup = () => shallow(<DropDown {...defaultProps} />);

describe('test dropdown', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without error', () => {
    expect(wrapper.length).toBe(1);
  });

  test('renders button', () => {
    const buttonElement = findByTestAttr(wrapper, 'dropdown-button');
    expect(buttonElement.length).toBe(1);
  });

  test('sets activeDropdown to true on mouseover', () => {
    wrapper.simulate('mouseenter');
    expect(wrapper.state('activeDropDown')).toBe(true);
  });

  test('sets activeDropdown to false on mouseleave', () => {
    wrapper.simulate('mouseleave');
    expect(wrapper.state('activeDropDown')).toBe(false);
  });

  test("has class 'show' when activeDropdown is true", () => {
    wrapper.setState({ activeDropDown: true });
    const dropDownInfo = findByTestAttr(wrapper, 'dropdown-info');

    expect(dropDownInfo.hasClass('show')).toBe(true);
    expect(dropDownInfo.hasClass('hide')).toBe(false);
  });

  test("has class 'hide' when activeDropdown is false", () => {
    wrapper.setState({ activeDropDown: false });
    const dropDownInfo = findByTestAttr(wrapper, 'dropdown-info');

    expect(dropDownInfo.hasClass('hide')).toBe(true);
    expect(dropDownInfo.hasClass('show')).toBe(false);
  });
});
