import React from 'react';
import PropTypes from 'prop-types';
import SideBar from './SideBar';
import Nav from './Nav';
import './Page.scss';

interface IProps {
  navHeader?: string;
  children: React.ReactNode;
}

const Page = ({ children, navHeader }: IProps) => (
  <div className="page-wrapper">
    <Nav data-test="nav" navHeader={navHeader} />
    <div className="page">
      <SideBar data-test="side-bar" />
      <div className="main" data-test="page-children">
        {children}
      </div>
    </div>
  </div>
);

Page.propTypes = {
  navHeader: PropTypes.string,
  analysisLinks: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired
};

export default Page;
