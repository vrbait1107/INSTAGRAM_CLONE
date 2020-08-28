import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="white" className="py-2 shadow" expand="lg">
      <Navbar.Brand href="#home" className="font-hotel">
        Instagram
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            className="text-uppercase font-weight-bold text-dark"
            href="#home"
          >
            Log In
          </Nav.Link>

          <Nav.Link
            className="text-uppercase font-weight-bold text-dark"
            href="#link"
          >
            Sign Up
          </Nav.Link>

          <Nav.Link
            className="text-uppercase font-weight-bold text-dark"
            href="#link"
          >
            Profile
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
