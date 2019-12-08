import React from 'react';
import PropTypes from 'prop-types';
import { format } from '../../utils/formatText';
import './Checkbox.scss';

interface IProps {
  text: string;
  name: string;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const CheckBox = ({ text, name, onCheckboxChange, checked }: IProps) => (
  <label className="checkboxGroup" data-test="checkbox-group">
    {format(text)}
    <input
      type="checkbox"
      data-test="checkbox"
      name={name}
      onChange={onCheckboxChange}
      value={text}
      checked={checked}
    />
    <span className="checkmark"></span>
  </label>
);

CheckBox.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default CheckBox;
