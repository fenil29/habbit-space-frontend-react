import React, { useEffect, useState, useContext } from "react";
import { useParams,useLocation } from "react-router-dom";
import "./HabitView.scss";

import { Box, Stack, Skeleton, Button } from "@chakra-ui/react";
import Calendar from "./calendar/Calendar";

import { API_URL } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";
import { HamburgerIcon } from "@chakra-ui/icons";

import axios from "axios";

function HabitView(props) {
  let { habit_id } = useParams();
  const location = useLocation();
  const contextStore = useContext(GlobalContext);
  console.log("props.habitsDateInfo",props.habitsDateInfo)
  let currentHabitData = props.habitsDateInfo[habit_id];
  const setCurrentHabitData = (data) => {
    props.habitsDateInfo[habit_id] = data;
    props.addHabitsDateInfo(props.habitsDateInfo);
  };

  const addSelectedDate = (date, dateElement) => {
    currentHabitData.dates[date] = true;
    setCurrentHabitData(currentHabitData);

    axios
      .post(API_URL + "/api/habit-date/" + habit_id, {
        date: date,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        delete currentHabitData.dates[date];
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
  const removeSelectedDate = (date) => {
    delete currentHabitData.dates[date];
    setCurrentHabitData(currentHabitData);

    axios
      .delete(API_URL + "/api/habit-date/" + habit_id, {
        data: {
          date: date,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        currentHabitData.dates[date] = true;
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
  let onDateClick = (clickedDate) => {
    if (clickedDate in currentHabitData.dates) {
      removeSelectedDate(clickedDate);
    } else {
      addSelectedDate(clickedDate);
    }
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
    console.log('Location changed');
    if (!currentHabitData) {
      getHabitDate();
    }

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
          <h2 className="title">           
            {currentHabitData.habit_name}
          </h2>
          <hr className="habit-bottom-ht" />
          <Calendar
            selectedDate={currentHabitData.dates}
            addSelectedDate={addSelectedDate}
            removeSelectedDate={removeSelectedDate}
            onDateClick={onDateClick}
          />
        </>
      )}
    </Box>
  );
}
export default HabitView;
