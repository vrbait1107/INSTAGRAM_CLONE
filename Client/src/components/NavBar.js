import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="white" className="py-2 shadow" expand="lg">
      <Navbar.Brand>
        <Link className="font-hotel" to="/">
          Instagram
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link
            className="text-uppercase mx-3 font-weight-bold text-dark"
            to="/Login"
          >
            Log In
          </Link>

          <Link
            className="text-uppercase  mx-3 font-weight-bold text-dark"
            to="/Register"
          >
            Sign Up
          </Link>

          <Link
            className="text-uppercase  mx-3 font-weight-bold text-dark"
            to="/Profile"
          >
            Profile
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
