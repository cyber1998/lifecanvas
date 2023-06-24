import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./users/Profile";
import Home from "./Home";
import JournalList from "./journals/JournalList";
import ManageJournal from "./journals/JournalCreateEdit";

const HomePage = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [journalDropdownOpen, setJournalDropdownOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen((prevIsProfileOpen) => !prevIsProfileOpen);
  };

  const openProfileModal = () => {
    setIsProfileOpen(true);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    window.location.href = "/";
  };

  // Decode jwt to get the user from the request
  const getUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const user = JSON.parse(window.atob(base64));
      return user;
    }
    return null;
  };

  const user = getUser();

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const journalDropdownToggle = () => setJournalDropdownOpen(!journalDropdownOpen);


  return (
    <>
      <div className="container">
        <Navbar {...props} container="fluid" expand="xl">
          <NavbarBrand href="/">Lifecanvas</NavbarBrand>
          <NavbarToggler onClick={toggle} className="me-3" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="#" onClick={() => openProfileModal()}>
                  Profile
                </NavLink>
              </NavItem>
              <Dropdown nav isOpen={journalDropdownOpen} toggle={journalDropdownToggle}>
                <DropdownToggle nav caret>
                  Journals
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/journals">My Journals</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/manage-journals">Manage</DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
          <Route path="/" element={<Home user={user} />} />
          <Route path="/journals" element={<JournalList />} />
          <Route path="/manage-journals" element={<ManageJournal />} />
        </Routes>
      </Router>
      {isProfileOpen && (
        <Profile
          userId={user.user_id}
          toggle={toggleProfile}
          isOpen={isProfileOpen}
        />
      )}
    </>
  );
};

export default HomePage;
