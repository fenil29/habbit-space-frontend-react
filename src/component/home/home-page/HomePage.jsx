import React from "react";
import "./HomePage.scss";
import HomeIllustration from "../../../assets/HomeIllustration.svg";
import AllHabitOverview from "../../../assets/all_habit_overview.png";
import HabitOverview from "../../../assets/habit_overview.png";
import OpenSource from "../../../assets/OpenSource.svg";
import ExportData from "../../../assets/ExportData.svg";
import MonthWeek from "../../../assets/MonthWeek.svg";
import MobileApp from "../../../assets/MobileApp.svg";
import AnalyticsInformation from "../../../assets/AnalyticsInformation.svg";

function HomeContent() {
  return (
    <div className="home-page-content">
      <h1>A Minimal Habit Tracker</h1>
      {/* <h2>that help you to track your habit easily</h2> */}
      <h2>
        <b> Completely Free and Open Source </b> tracker to track your habit
        easily
      </h2>
      <div className="home-illustration-container">
        <img src={HomeIllustration} alt="Home Illustration" />
      </div>
      <div className="title">Features</div>

      <div className="feature-session">
        <div className="left">
          <h3>Completely Free and Open Source</h3>
          <p>
            All the features and functionality including upcoming features are free forever
          </p>
          <p>
            ** All Source code of the application will be available
            publicly soon
          </p>
        </div>
        <div className="right">
          <img src={OpenSource} alt="Home Illustration" />
        </div>
      </div>

      <div className="feature-session">
        <div className="left-2" style={{flex:"2"}}>
          <img src={AllHabitOverview} alt="Home Illustration" />
        </div>
        <div className="right-2">
          <h3>Habit Overview</h3>
          <p>
            you can see overview of all of your habit over the past few months
          </p>
        </div>
      </div>

      <div className="feature-session">
        <div className="left">
          <h3>Simple Interface</h3>
          <p>
            Provides you the easy to use interface so complex features and
            options don't come info your way
          </p>
        </div>
        <div className="right">
          <img src={HabitOverview} alt="Home Illustration" />
        </div>
      </div>


      <div className="title">Upcoming Features</div>
      
      <div className="feature-session">
        <div className="left">
          <h3>Mobile Applications</h3>
          <p>
          Android and IOS application in form of PWA will be available
          </p>
        </div>
        <div className="right">
          <img src={MobileApp} alt="Home Illustration" />
        </div>
      </div>


      <div className="feature-session">
        <div className="left-2">
          <img src={AnalyticsInformation} alt="Home Illustration" />
        </div>
        <div className="right-2">
          <h3>Analytics Information</h3>
          <p>
          Every habit will have Analytics information  
          </p>
        </div>
      </div>

   
      <div className="feature-session">
        <div className="left">
          <h3>Export Data</h3>
          <p>
            You will be able to export all of your data in CSV format
          </p>
        </div>
        <div className="right">
          <img src={ExportData} alt="Home Illustration" />
        </div>
      </div>

      <div className="feature-session">
        <div className="left-2">
          <img src={MonthWeek} alt="Home Illustration" />
        </div>
        <div className="right-2">
          <h3>More Habit options</h3>
          <p>
            you will be able to select the duration and timing of the habit by the month and week
          </p>
        </div>
      </div>

    </div>
  );
}

export default HomeContent;
