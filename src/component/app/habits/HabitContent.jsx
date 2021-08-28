import React, { useEffect, useState, useRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HabitView from "./HabitView";
import AllHabit from "./AllHabit";

import "./HabitContent.scss";

import { io } from "socket.io-client";
import { API_URL } from "../../../Constants";

// let habitsDateInfo = {};
let socket;

function HabitContent(props) {
  let [habitsDateInfo, setHabitsDateInfo] = React.useState({});
  let [currentSessionId, setCurrentSessionId] = React.useState("");

  let addHabitsDateInfo = (data) => {
    let temp = { ...data };
    setHabitsDateInfo(temp);
  };
  let handleHabitChangeFromSocket = (data) => {
    setCurrentSessionId((currentStateCurrentSessionId) => {
      console.log("shjfdhjs786  1", data.currentSessionId);
      console.log("shjfdhjs786  2", currentStateCurrentSessionId);
      if (data.currentSessionId !== currentStateCurrentSessionId) {
        console.log("kjfdgkjfdkj54h6j54")
        setHabitsDateInfo((currentState) => {
          console.log(currentState, currentState[data.habit_id]);
          if (currentState[data.habit_id]) {
            currentState[data.habit_id].dates[data.habitChangeData.date] =
              data.habitChangeData[data.habitChangeData.date];
            return { ...currentState };
          } else {
            return currentState;
          }
        });
      }
      return currentStateCurrentSessionId;
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
    socket.on("message", (sessionId) => {
      console.log("connected", sessionId); //
      setCurrentSessionId(sessionId);
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
    <div className="habit-content">
      <Switch>
        <Route path="/app/habit/:habit_id" exact>
          <HabitView
            habitsDateInfo={habitsDateInfo}
            onSideDrawerOpen={props.onSideDrawerOpen}
            addHabitsDateInfo={addHabitsDateInfo}
            currentSessionId={currentSessionId}
          />
        </Route>
        <Route path="/app/all-habit" exact>
          <AllHabit
            onSideDrawerOpen={props.onSideDrawerOpen}
            addHabitsDateInfo={addHabitsDateInfo}
            onOpenAddHabitModel={props.onOpenAddHabitModel}
          />
        </Route>
        <Redirect to="/app/all-habit" />
      </Switch>
    </div>
  );
}

export default HabitContent;
