import React from "react";
import { Link } from "react-router-dom";
import "./HomeNavBar.scss";
import Logo from "../../Logo";

function HomeNavBar() {
  return (
    <div className="nav-bar">
      <div className="nav-bar-content">
        <Link to="/">
          <Logo />
        </Link>
        <div className="right-home">
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
