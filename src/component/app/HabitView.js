import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { Box, Stack, Skeleton,Button } from "@chakra-ui/react";
import "./HabitView.scss";
import Calendar from "./calendar/Calendar";

import { API_URL } from "../../Constants";
import { GlobalContext } from "../../context/GlobalState";

import axios from "axios";

function HabitView(props) {
  const contextStore = useContext(GlobalContext);
  let { habit_id } = useParams();
  const [getHabitDateLoading, setGetHabitDateLoading] = useState(true);
  const [currentHabitDate, setCurrentHabitDate] = useState(
    props.habitsDateInfo[habit_id]
  );

  const addSelectedDate = (date, dateElement) => {
    let currentHabitDateTemp = { ...currentHabitDate };
    currentHabitDateTemp.dates[date] = true;
    setCurrentHabitDate(currentHabitDateTemp);
    props.addHabitsDateInfo(habit_id, currentHabitDateTemp);

    axios
      .post(API_URL + "/api/habit-date/" + habit_id, {
        date: date,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data === "Unauthorized"
        ) {
          contextStore.clearLoginDataAndRedirectToLogin();
        } else {
          let currentHabitDateTemp = { ...currentHabitDate };
          delete currentHabitDateTemp.dates[date];
          setCurrentHabitDate(currentHabitDateTemp);
          dateElement.classList.remove("calendar-day--selected");
          contextStore.showUnexpectedError();
        }
      });
  };
  const removeSelectedDate = (date, dateElement) => {
    let currentHabitDateTemp = { ...currentHabitDate };
    delete currentHabitDateTemp.dates[date];
    setCurrentHabitDate(currentHabitDateTemp);
    props.addHabitsDateInfo(habit_id, currentHabitDateTemp);

    axios
      .delete(API_URL + "/api/habit-date/" + habit_id, {
        data: {
          date: date,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data === "Unauthorized"
        ) {
          contextStore.clearLoginDataAndRedirectToLogin();
        } else {
          let currentHabitDateTemp = { ...currentHabitDate };
          currentHabitDateTemp.dates[date] = true;
          setCurrentHabitDate(currentHabitDateTemp);
          dateElement.classList.add("calendar-day--selected");
          contextStore.showUnexpectedError();
        }
      });
  };
  let getHabitDate = () => {
    if (!currentHabitDate) {
      setGetHabitDateLoading(true);
      axios
        .get(API_URL + "/api/habit-date/" + habit_id)
        .then((response) => {
          setGetHabitDateLoading(false);
          setCurrentHabitDate(response.data);
          props.addHabitsDateInfo(habit_id, response.data);
        })
        .catch((error) => {
          setGetHabitDateLoading(false);
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
    }
  };

  useEffect(() => {
    // effect
    // console.log(habit_id);
    getHabitDate();
    return () => {
      // cleanup
    };
  }, []);
  return (
    <Box className="app-content">
      {!currentHabitDate ? (
        <Stack m={10}>
          <Skeleton height="30px" mb={10} />
          {/* <Skeleton height="200px" /> */}
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <>
        
        <Button
          colorScheme="teal"
          onClick={props.onSideDrawerOpen}
        ></Button>
          <h2>{currentHabitDate.habit_name}</h2>
          <Calendar
            selectedDate={currentHabitDate.dates}
            addSelectedDate={addSelectedDate}
            removeSelectedDate={removeSelectedDate}
          />
        </>
      )}
    </Box>
  );
}

export default HabitView;
