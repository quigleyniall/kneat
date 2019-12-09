import React from 'react';
import { Link } from 'react-router-dom';
import kneat from '../../../assets/kneat-logo.svg';
import './SideBar.scss';

const Sidemenu = () => (
  <div className="sidebar">
    <div className="top">
      <div className="sidebar-header">General</div>
      <ul className="menu">
        <Link to="/films" className="routerLink">
          <li className="link">Films</li>
        </Link>
        <Link to="/people" className="routerLink">
          <li className="link">People</li>
        </Link>
        <Link to="/species" className="routerLink">
          <li className="link">Species</li>
        </Link>
        <Link to="/starship" className="routerLink">
          <li className="link">Star Ships</li>
        </Link>
        <Link to="/vehicles" className="routerLink">
          <li className="link">Vehicles</li>
        </Link>
      </ul>
      <div className="sidebar-header">Analysis</div>
      <ul className="menu">
        <Link to="/starship/analysis" className="routerLink">
          <li className="link">Star Ships</li>
        </Link>
      </ul>
    </div>
    <img src={kneat} alt="logo" className="logo" />
  </div>
);

export default Sidemenu;
