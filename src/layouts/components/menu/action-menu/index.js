import '@custom-styles/basic/action-bar-menu.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Nav, Navbar, NavbarBrand } from 'reactstrap';

const ActionMenu = ({ children, breadcrumb, title }) => {
  return (
    <Navbar color="light" light expand="xs" className="action-bar border border-gray-50">
      <NavbarBrand tag={Link} to="/">
        {title} <span>|</span>
      </NavbarBrand>
      <Nav className="mr-auto d-flex " navbar>
        {children}
      </Nav>
      <Nav className="ml-auto" navbar>
        <Breadcrumb listTag="div">
          {breadcrumb?.map(bc => (
            <BreadcrumbItem key={bc.id} to={bc.link} tag={bc.isActive ? 'span' : Link}>
              {bc.name}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Nav>
    </Navbar>
  );
};

export default ActionMenu;
