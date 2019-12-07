import React from 'react';
import kneat from '../../../assets/kneat-logo.svg';
import Heading from '../../Heading';
import './Nav.scss';

const Nav = ({ navHeader }) => (
  <nav>
    <img src={kneat} alt="logo" className="logo" />
    <Heading text={navHeader} />
  </nav>
);

export default Nav;
