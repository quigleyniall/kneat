import React from 'react';
import { format } from '../../utils/formatText';
import './Checkbox.scss';

const CheckBox = ({ check, name, onCheckboxChange, checked }) => (
  <label className="checkboxGroup">
    {format(check)}
    <input
      type="checkbox"
      name={name}
      onChange={onCheckboxChange}
      value={check}
      checked={checked}
    />
    <span className="checkmark"></span>
  </label>
);

export default CheckBox;
