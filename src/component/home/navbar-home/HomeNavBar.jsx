import React from "react";
import Logo from "../../Logo";
import "./HomeNavBar.scss";
import { Link } from "react-router-dom";

function HomeNavBar() {
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

export default HomeNavBar;