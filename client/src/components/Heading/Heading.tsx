import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ text }: { text: string }) => <h2>{text}</h2>;

Heading.propTypes = {
  text: PropTypes.string.isRequired
};

export default Heading;
