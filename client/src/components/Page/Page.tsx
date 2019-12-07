import React from 'react';
import SideBar from './SideBar';
import Nav from './Nav';
import './Page.scss';

const Page = ({ children, navHeader, analysisLinks }) => (
  <div className="page-wrapper">
    <Nav navHeader={navHeader} />
    <div className="page">
      <SideBar analysisLinks={analysisLinks} />
      <div className="main">{children}</div>
    </div>
  </div>
);

export default Page;
