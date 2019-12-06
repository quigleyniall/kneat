import React from 'react';

const TextInput = ({ name, type, handleChange }) => (
  <input name={name} className="input" type={type} onChange={handleChange} />
);

export default TextInput;
