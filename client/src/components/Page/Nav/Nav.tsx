import React from 'react';
import PropTypes from 'prop-types';
import kneat from '../../../assets/kneat-logo.svg';
import Heading from '../../Heading';
import './Nav.scss';

const Nav = ({ navHeader }: { navHeader: string }) => (
  <nav>
    <img src={kneat} alt="logo" className="logo" />
    <Heading text={navHeader} />
  </nav>
);

Nav.propTypes = {
  navHeader: PropTypes.string.isRequired
};

Nav.defaultProps = {
  navHeader: ''
};

export default Nav;
