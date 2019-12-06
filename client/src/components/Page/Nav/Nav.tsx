import React from 'react';
import kneat from '../../../assets/kneat-logo.svg';
import Heading from '../../Heading';
import './Nav.scss';

const Nav = () => (
  <nav>
    <img src={kneat} alt="logo" className="logo" />
    <Heading text="Find the perfect Star Ship for your Journey" />
  </nav>
);

export default Nav;
