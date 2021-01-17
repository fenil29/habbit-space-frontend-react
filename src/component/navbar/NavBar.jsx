import React from "react";
import Logo from "../Logo";
import "./NavBar.scss";
import { Container, Center } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-bar">
      <div className="nav-bar-content">
        <Link to="/">
          <Logo />
        </Link>
        <div className="right">
          <Link to="/login" className="element">
            Login
          </Link>
          <Link to="/signup" className="element">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
