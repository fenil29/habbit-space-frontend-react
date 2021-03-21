import React, { useContext, useEffect, useState } from "react";

import "./AllHabit.scss";
import CalendarHeatmap from "react-calendar-heatmap";
import { API_URL } from "../../Constants";
import { GlobalContext } from "../../context/GlobalState";

import axios from "axios";

const today = new Date();

function AllHabit(props) {
  const contextStore = useContext(GlobalContext);
  const [habitInfoWithDate, setHabitInfoWithDate] = useState([]);

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

    return () => {
      // cleanup
    };
  }, []);
  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  return (
    <div className="all-habit-container">
      All habit h
      {habitInfoWithDate.map((habit) => (
        <CalendarHeatmap
          // startDate={shiftDate(today, -150)}
          startDate={shiftDate(today, -365)}
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
      ))}
    </div>
  );
}

export default AllHabit;
