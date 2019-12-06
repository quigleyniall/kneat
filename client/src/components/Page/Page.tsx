import React from 'react';
import SideBar from './SideBar';
import Nav from './Nav';
import './Page.scss';

const Page = ({ children }) => (
  <div className="page-wrapper">
    <Nav />
    <div className="page">
      <SideBar />
      <div className="main">{children}</div>
    </div>
  </div>
);

export default Page;
