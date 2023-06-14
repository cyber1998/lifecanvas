import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './users/UserPage';
import Home from './Home';
import JournalPage from './journals/JournalPage';



const HomePage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
   
  console.log(props.isLoggedIn)

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
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      <Router>
        <Routes>
          <Route path="/users" element={<UserPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/journals" element={<JournalPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default HomePage;
