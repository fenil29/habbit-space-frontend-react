import React from 'react'
import "./HomePage.scss"
import HomeIllustration from "../../../assets/HomeIllustration.svg";


function HomeContent() {
    return (
        <div className="home-page-content">
        <h1>A Minimal Habit Tracker</h1>
        <h2>that help you to track your habit easily</h2>
        <div className="home-illustration-container">
          <img src={HomeIllustration} alt="Home Illustration" />
        </div>
      </div>
    )
}

export default HomeContent
