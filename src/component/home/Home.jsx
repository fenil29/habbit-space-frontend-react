import React from "react";
import "./Home.scss";
import HomePage from "./home-page/HomePage";
import HomeNavBar from "./navbar-home/HomeNavBar";

function Home() {
  return (
    <>
      <HomeNavBar />
      <div className="home">
        <HomePage />
      </div>
    </>
  );
}

export default Home;
