import React from 'react';
import './Button.scss';

const Button = ({ text, onPress, btnClass, disabled = false }) => (
  <button
    onClick={onPress}
    className={`btn btn-${btnClass}`}
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;
