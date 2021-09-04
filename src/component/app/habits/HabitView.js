import React, { useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./HabitView.scss";

import { Box, Stack, Skeleton } from "@chakra-ui/react";
import Calendar from "./calendar/Calendar";

import { API_URL } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";
import { HamburgerIcon } from "@chakra-ui/icons"; 

import axios from "axios";

function HabitView(props) {
  let { habit_id } = useParams();
  const location = useLocation();
  const contextStore = useContext(GlobalContext);
  console.log("props.habitsDateInfo", props.habitsDateInfo);
  let currentHabitData = props.habitsDateInfo[habit_id];
  const setCurrentHabitData = (data) => {
    props.habitsDateInfo[habit_id] = data;
    props.addHabitsDateInfo(props.habitsDateInfo);
  };

  let onDateClick = (clickedDate) => {
    if (currentHabitData.dates[clickedDate] === 1) {
      currentHabitData.dates[clickedDate] = -1;
    } else if (currentHabitData.dates[clickedDate] === -1) {
      currentHabitData.dates[clickedDate] = 0;
    } else if (
      !currentHabitData.dates[clickedDate] ||
      currentHabitData.dates[clickedDate] === 0
    ) {
      currentHabitData.dates[clickedDate] = 1;
    }
    setCurrentHabitData(currentHabitData);

    axios
      .post(API_URL + "/api/habit-date/" + habit_id, {
        date: clickedDate,
        status: currentHabitData.dates[clickedDate],
        currentSessionId: props.currentSessionId,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        delete currentHabitData.dates[clickedDate];
        setCurrentHabitData(currentHabitData);
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
  let getHabitDate = () => {
    axios
      .get(API_URL + "/api/habit-date/" + habit_id)
      .then((response) => {
        currentHabitData = response.data;
        setCurrentHabitData(currentHabitData);
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
    console.log("Location changed");
    if (!currentHabitData) {
      getHabitDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  useEffect(() => {
    return () => {
      // cleanup
    };
  }, []);
  return (
    <Box className="habit-view-container">
      {!currentHabitData ? (
        <Stack mt={10} className="calendar-month">
          <Skeleton height="30px" mb={10} />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <>
          <div className="habit-main-top-title">
            <HamburgerIcon
              onClick={props.onSideDrawerOpen}
              ml={5}
              className="side-drawer-menu"
            />
            <h2> {currentHabitData.habit_name}</h2>
          </div>
          <hr className="habit-bottom-ht" />
          <Calendar
            selectedDate={currentHabitData.dates}
            onDateClick={onDateClick}
          />
        </>
      )}
    </Box>
  );
}
export default HabitView;
