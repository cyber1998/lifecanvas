import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './users/UserList';
import Home from './Home';
import JournalPage from './journals/JournalPage';



const HomePage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    window.location.href = '/';
  };

  // Decode jwt to get the user from the request
  const getUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const user = JSON.parse(window.atob(base64));
      return user.first_name;
    }
    return null;
  };


  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <div className="container">
        <Navbar {...props} container="fluid" expand="true">
          <NavbarBrand href="/">Lifecanvas</NavbarBrand>
          <NavbarToggler onClick={toggle} className="me-2" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/users">Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/journals">My Journals</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" onClick={logOut}>
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      <Router>
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<Home firstName={getUser()}/>} />
          <Route path="/journals" element={<JournalPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default HomePage;
