import React from 'react';
import { NavLink } from 'react-router-dom';
import kneat from '../../../assets/kneat-logo.svg';
import './SideBar.scss';

const Sidemenu = () => (
  <div className="sidebar">
    <div className="top">
      <div className="sidebar-header">General</div>
      <ul className="menu">
        <NavLink activeClassName="selected" to="/films" className="routerLink">
          <li className="link">Films</li>
        </NavLink>
        <NavLink activeClassName="selected" to="/people" className="routerLink">
          <li className="link">People</li>
        </NavLink>
        <NavLink
          activeClassName="selected"
          to="/species"
          className="routerLink"
        >
          <li className="link">Species</li>
        </NavLink>
        <NavLink
          activeClassName="selected"
          exact
          to="/starship"
          className="routerLink"
        >
          <li className="link">Star Ships</li>
        </NavLink>
        <NavLink
          activeClassName="selected"
          to="/vehicles"
          className="routerLink"
        >
          <li className="link">Vehicles</li>
        </NavLink>
      </ul>
      <div className="sidebar-header">Analysis</div>
      <ul className="menu">
        <NavLink
          activeClassName="selected"
          to="/starship/analysis"
          className="routerLink"
        >
          <li className="link">Star Ships</li>
        </NavLink>
      </ul>
    </div>
    <img src={kneat} alt="logo" className="logo" />
  </div>
);

export default Sidemenu;
