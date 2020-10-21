import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);

  const renderList = () => {
    if (state) {
      return [
        <Link className="font-nav mx-3 text-dark" to="/CreatePost">
          Create Post
        </Link>,

        <Link className="font-nav mx-3 text-dark" to="/Profile">
          Profile
        </Link>,
      ];
    } else {
      return [
        <Link className="font-nav mx-3 text-dark" to="/Login">
          Log In
        </Link>,

        <Link className="font-nav  mx-3 text-dark" to="/Register">
          Sign Up
        </Link>,
      ];
    }
  };

  return (
    <Navbar bg="white" className="py-2 shadow" expand="lg">
      <Navbar.Brand>
        <Link className="font-hotel" to={state ? "/" : "/Login"}>
          Instagram
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto"></Nav>
        {renderList()}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
