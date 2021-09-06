import React from "react";
import "./Logo.scss";
import Rocket from "../assets/rocket.svg";

function Logo() {
  return (
    <div className="logo">
      <img src={Rocket} alt="Home Illustration" className="icon"/>
      Habbit Space
    </div>
  );
}

export default Logo;
