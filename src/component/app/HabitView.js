import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./HabitView.scss";

import { Box, Stack, Skeleton, Button } from "@chakra-ui/react";
import Calendar from "./calendar/Calendar";

import { API_URL } from "../../Constants";
import { GlobalContext } from "../../context/GlobalState";
import { HamburgerIcon } from "@chakra-ui/icons";

import axios from "axios";

let requestedAddHabitDateTemp = {};
let requestedRemoveHabitDateTemp = {};
function HabitView(props) {
  let { habit_id } = useParams();
  const contextStore = useContext(GlobalContext);
  let currentHabitData = props.habitsDateInfo[habit_id];
  const setCurrentHabitData = (data) => {
    props.habitsDateInfo[habit_id] = data;
    props.addHabitsDateInfo(props.habitsDateInfo);
  };

  const addSelectedDate = (date, dateElement) => {
    // add date which is not completed to temp container
    if (!requestedAddHabitDateTemp[habit_id]) {
      requestedAddHabitDateTemp[habit_id] = {};
    }
    requestedAddHabitDateTemp[habit_id][date] = true;
    // console.log("tempstorelog", requestedAddHabitDateTemp);
    if (
      requestedRemoveHabitDateTemp[habit_id] &&
      date in requestedRemoveHabitDateTemp[habit_id]
    ) {
      delete requestedRemoveHabitDateTemp[habit_id][date];
    }
    currentHabitData.dates[date] = true;
    setCurrentHabitData(currentHabitData);

    axios
      .post(API_URL + "/api/habit-date/" + habit_id, {
        date: date,
      })
      .then((response) => {
        // remove from temp container if the request is completed
        delete requestedAddHabitDateTemp[habit_id][date];
      })
      .catch((error) => {
        // remove from temp container if the request is completed
        delete requestedAddHabitDateTemp[habit_id][date];
        console.log(error);
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data === "Unauthorized"
        ) {
          contextStore.clearLoginDataAndRedirectToLogin();
        } else {
          delete currentHabitData.dates[date];
          setCurrentHabitData(currentHabitData);
          contextStore.showUnexpectedError();
        }
      });
  };
  const removeSelectedDate = (date, dateElement) => {
    // add date which is not completed to temp container
    if (!requestedRemoveHabitDateTemp[habit_id]) {
      requestedRemoveHabitDateTemp[habit_id] = {};
    }

    requestedRemoveHabitDateTemp[habit_id][date] = true;
    if (
      requestedAddHabitDateTemp[habit_id] &&
      date in requestedAddHabitDateTemp[habit_id]
    ) {
      delete requestedAddHabitDateTemp[habit_id][date];
    }
    let currentHabitDateTemp = { ...currentHabitData };
    delete currentHabitData.dates[date];
    setCurrentHabitData(currentHabitData);

    axios
      .delete(API_URL + "/api/habit-date/" + habit_id, {
        data: {
          date: date,
        },
      })
      .then((response) => {
        // remove from temp container if the request is completed
        delete requestedRemoveHabitDateTemp[habit_id][date];
      })
      .catch((error) => {
        // remove from temp container if the request is completed
        delete requestedRemoveHabitDateTemp[habit_id][date];
        console.log(error);
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data === "Unauthorized"
        ) {
          contextStore.clearLoginDataAndRedirectToLogin();
        } else {
          currentHabitData.dates[date] = true;
          setCurrentHabitData(currentHabitData);
          // dateElement.classList.add("calendar-day--selected");
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
    if (true) {
      // if (!currentHabitData) {
      axios
        .get(API_URL + "/api/habit-date/" + habit_id)
        .then((response) => {
          // add currently pending add date request
          // if the request is successful no need to add because the the response of this request most likely has that date
          response.data.dates = {
            ...response.data.dates,
            ...requestedAddHabitDateTemp[habit_id],
          };
          // remove currently pending remove date request
          if (requestedRemoveHabitDateTemp[habit_id]) {
            for (let ele in requestedRemoveHabitDateTemp[habit_id]) {
              if (ele in response.data.dates) {
                delete response.data.dates[ele];
              }
            }
          }
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
    }
  };
  console.log("4576k7h5j7h57", currentHabitData);
  if (!currentHabitData) {
    getHabitDate();
  }
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
          {/* <Skeleton height="200px" /> */}
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <>
          <h2>
            {/* <Button onClick={props.onSideDrawerOpen} size="sm" mr={2}> */}
            <HamburgerIcon
              onClick={props.onSideDrawerOpen}
              mr={3}
              className="side-drawer-menu"
            />
            {/* </Button> */}
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
