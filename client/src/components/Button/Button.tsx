import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

interface IProps {
  text: string;
  onPress: () => void;
  btnClass: string;
  disabled: boolean;
  type: 'button' | 'submit' | 'reset';
}

const Button = ({ text, onPress, btnClass, disabled, type }: IProps) => (
  <button
    type={type}
    onClick={onPress}
    className={`btn btn-${btnClass}`}
    disabled={disabled}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  btnClass: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
};

Button.defaultProps = {
  type: 'button',
  disabled: false
};

export default Button;
