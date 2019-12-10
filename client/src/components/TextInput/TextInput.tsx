import React from 'react';
import PropTypes from 'prop-types';

interface IProps {
  name: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const TextInput = ({ name, type, handleChange, value }: IProps) => (
  <input
    name={name}
    className="input"
    type={type}
    onChange={handleChange}
    value={value}
  />
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

TextInput.defaultProps = {
  type: 'text'
};

export default TextInput;
