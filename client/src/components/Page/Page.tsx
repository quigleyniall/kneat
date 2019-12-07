import React from 'react';
import SideBar from './SideBar';
import Nav from './Nav';
import './Page.scss';

interface IProps {
  navHeader?: string;
  analysisLinks: string[];
  children: React.ReactNode;
}

const Page = ({ children, navHeader, analysisLinks }: IProps) => (
  <div className="page-wrapper">
    <Nav navHeader={navHeader} />
    <div className="page">
      <SideBar analysisLinks={analysisLinks} />
      <div className="main">{children}</div>
    </div>
  </div>
);

export default Page;
