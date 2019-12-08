import React from 'react';
import kneat from '../../../assets/kneat-logo.svg';
import './SideBar.scss';

const Sidemenu = ({ analysisLinks }: { analysisLinks: string[] }) => (
  <div className="sidebar">
    <div className="top">
      <div className="sidebar-header">Analysis</div>
      <ul className="menu" data-test="analysis-container">
        {analysisLinks.map((link, i) => {
          return (
            <li key={i} className="link">
              {link}
            </li>
          );
        })}
      </ul>
    </div>
    <img src={kneat} alt="logo" className="logo" />
  </div>
);

export default Sidemenu;
