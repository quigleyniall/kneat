import React from 'react';

interface IProps {
  name: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ name, type, handleChange }: IProps) => (
  <input name={name} className="input" type={type} onChange={handleChange} />
);

export default TextInput;
