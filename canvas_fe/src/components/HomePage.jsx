
import React, { Component } from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserPage from './users/UserPage';
import Home from './Home';
import JournalPage from './journals/JournalPage';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { isOpen } = this.state;

    return (
        <>
            <div class="container">
            <Navbar {...this.props} container="fluid" expand="true">
            <NavbarBrand href="/">Lifecanvas</NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="me-2"/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                <NavItem>
                    <NavLink href="/users">
                        Users
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/journals">
                        My Journals
                    </NavLink>
                </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
            </div>
            <Router>
                <Routes>
                    <Route path="/users" element={<UserPage/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/journals" element={<JournalPage/>} />
                </Routes> 
            </Router>
        </>
    );
  }
}

export default HomePage;
