import React, { useEffect, useState, useRef } from "react";
import { Switch, Route } from "react-router-dom";

import HabitView from "./HabitView";
import AllHabit from "./AllHabit";

import "./AppContent.scss";

import { io } from "socket.io-client";
import { API_URL } from "../../Constants";

// let habitsDateInfo = {};

function AppContent(props) {
  const [habitsDateInfo, setHabitsDateInfo] = React.useState({});

  let addHabitsDateInfo = (data) => {
    let temp = {...data}
    setHabitsDateInfo(temp);
  };
  useEffect(() => {
    const socket = io(API_URL, { path: "/api/socket.io" });

    console.log("initialize socket");
    // effect
    socket.on("habit change", (data) => {
      console.log(data);
      if (habitsDateInfo[data.habit_id]) {
        if (data.add) {
          habitsDateInfo[data.habit_id].dates[data.add.date] = data.add[data.add.date];
          addHabitsDateInfo(habitsDateInfo);
        } else if (data.remove) {
          delete habitsDateInfo[data.habit_id].dates[data.remove.date];
          addHabitsDateInfo(habitsDateInfo);
        }
      }
    });

    return () => {
      socket.off("habit change");
      // cleanup
    };
  }, []);
  return (
    <div className="app-content">
      <Route path="/app/habit/:habit_id" exact>
        <HabitView
          onSideDrawerOpen={props.onSideDrawerOpen}
          habitsDateInfo={habitsDateInfo}
          addHabitsDateInfo={addHabitsDateInfo}
        />
      </Route>
      <Route
        path="/app/all-habit"
        exact
        component={() => <AllHabit addHabitsDateInfo={addHabitsDateInfo} />}
      />
    </div>
  );
}

export default AppContent;
