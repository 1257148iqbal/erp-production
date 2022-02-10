import themeConfig from '@configs/themeConfig';
import React from 'react';
import { Link } from 'react-router-dom';

const ERPLogo = () => {
  return (
    <li className="nav-item">
      <Link to="/" className="navbar-brand d-flex align-items-center">
        {/* <NavLink to="/" className="navbar-brand d-flex align-items-center"> */}
        <span className="brand-logo">
          <img src={themeConfig.app.appLogoImage} width={35} alt="logo" />
        </span>
        <h2 className="brand-text mb-0 d-xl-none">{themeConfig.app.appName}</h2>
        {/* </NavLink> */}
      </Link>
    </li>
  );
};

export default ERPLogo;
