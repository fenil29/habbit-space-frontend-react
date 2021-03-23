import React, { useEffect, useState, useRef } from "react";
import { Switch, Route } from "react-router-dom";

import HabitView from "./HabitView";
import AllHabit from "./AllHabit";

import "./AppContent.scss";

import { io } from "socket.io-client";
import { API_URL } from "../../Constants";

// let habitsDateInfo = {};
let socket;

function AppContent(props) {
  const [habitsDateInfo, setHabitsDateInfo] = React.useState({});

  let addHabitsDateInfo = (data) => {
    let temp = { ...data };
    setHabitsDateInfo(temp);
  };
  let handleHabitChangeFromSocket = (data) => {
    setHabitsDateInfo((currentState) => {
      console.log(currentState, currentState[data.habit_id]);
      if (currentState[data.habit_id]) {
        if (data.add) {
          currentState[data.habit_id].dates[data.add.date] =
            data.add[data.add.date];
          return { ...currentState };
        } else if (data.remove) {
          delete currentState[data.habit_id].dates[data.remove.date];
          return { ...currentState };
        }
      } else {
        return currentState;
      }
    });
  };
  useEffect(() => {
    socket = io(API_URL, { path: "/api/socket.io" });

    console.log("initialize socket");
    // effect
    socket.on("habit change", handleHabitChangeFromSocket);
    socket.on("connect", () => {
      console.log("connected"); //
    });
    socket.on("disconnect", () => {
      console.log("disconnect"); //
    });

    return () => {
      socket.off("habit change", handleHabitChangeFromSocket);
      socket.disconnect();
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
