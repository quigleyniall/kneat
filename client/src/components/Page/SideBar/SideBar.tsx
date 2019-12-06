import React from 'react';
import kneat from '../../../assets/kneat-logo.svg';
import './SideBar.scss';

const Sidemenu = () => {
  const topics = ['Star Ships'];
  return (
    <div className="sidebar">
      <div className="top">
        <div className="sidebar-header">Analysis</div>
        <ul className="menu">
          {topics.map((link, i) => {
            return (
              <li key={i} onClick={() => {}} className="link">
                {link}
              </li>
            );
          })}
        </ul>
      </div>
      <img src={kneat} alt="logo" className="logo" />
    </div>
  );
};

export default Sidemenu;
