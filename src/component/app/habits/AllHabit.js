import React, { useContext, useEffect, useState } from "react";

import "./AllHabit.scss";
import CalendarHeatmap from "react-calendar-heatmap";
import { API_URL } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";

import axios from "axios";

const today = new Date();

function AllHabit(props) {
  const contextStore = useContext(GlobalContext);
  const [habitInfoWithDate, setHabitInfoWithDate] = useState([]);
  const [totalDisplayDay, setTotalDisplayDay] = useState(365);

  let getHabitWithDate = () => {
    axios
      .get(API_URL + "/api/habit-with-date")
      .then((response) => {
        console.log(response.data);
        for (let habitInfo of response.data) {
          // adding to local cache
          // let storeForCache = { ...habitInfo };
          // storeForCache.dates = { ...storeForCache.dates };
          // props.addHabitsDateInfo(habitInfo.habit_id, storeForCache);
          // console.log("sdfsf324d", storeForCache);

          let dateValue = [];
          for (let date in habitInfo.dates) {
            dateValue.push({ date: date });
          }
          habitInfo.dates = dateValue;
        }
        console.log(response.data);
        setHabitInfoWithDate(response.data);
        // adding to local cache
      })
      .catch((error) => {
        console.log(error);

        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data === "Unauthorized"
        ) {
          contextStore.clearLoginDataAndRedirectToLogin();
        } else {
          contextStore.showUnexpectedError();
        }
      });
  };
  useEffect(() => {
    // effect
    getHabitWithDate();
    window.addEventListener('resize', handleResize)
    handleResize();
    return () => {
      // cleanup
    window.removeEventListener('resize', handleResize)

    };
  }, []);
  function handleResize() {
    let totalDays = document.querySelector(".habit-content").clientWidth * 0.35
    console.log(totalDays)
    if (totalDays > 365) {
      totalDays = 365
    }
    setTotalDisplayDay(totalDays)
  }
  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  return (
    <div className="all-habit-container">
      <h2 className="title">All habits Activity</h2>
      <hr className="habit-bottom-ht" />
      <br />
      {habitInfoWithDate.map((habit,index) => (
        <>
        <h3>{habit.habit_name}</h3>
        <CalendarHeatmap
          // startDate={shiftDate(today, -150)}
          key={index}
          startDate={shiftDate(today, -totalDisplayDay)}
          gutterSize={3}
          endDate={today}
          weekdayLabels={["S", "M", "T", "W", "T", "F", "S"]}
          // showOutOfRangeDays={true}
          values={habit.dates}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-completed`;
          }}
          showWeekdayLabels={true}
        />
         <hr className="habit-bottom-ht" />

        </>
      ))}
    </div>
  );
}

export default AllHabit;