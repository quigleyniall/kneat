import React from 'react';
import PropTypes from 'prop-types';
import { format } from '../../utils/formatText';
import './Checkbox.scss';

interface IProps {
  check: string;
  name: string;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const CheckBox = ({ check, name, onCheckboxChange, checked }: IProps) => (
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

CheckBox.propTypes = {
  check: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default CheckBox;
