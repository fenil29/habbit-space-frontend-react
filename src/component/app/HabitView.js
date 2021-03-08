import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { Box, Stack, Skeleton, Button } from "@chakra-ui/react";
import "./HabitView.scss";
import Calendar from "./calendar/Calendar";

import { API_URL } from "../../Constants";
import { GlobalContext } from "../../context/GlobalState";

import axios from "axios";

import { HamburgerIcon } from "@chakra-ui/icons";

let requestedAddHabitDateTemp = {};
let requestedRemoveHabitDateTemp = {};

function HabitView(props) {
  const contextStore = useContext(GlobalContext);
  let { habit_id } = useParams();
  const [getHabitDateLoading, setGetHabitDateLoading] = useState(true);
  const [currentHabitDate, setCurrentHabitDate] = useState(
    props.habitsDateInfo[habit_id]
  );
  const setCurrentHabitDateCustom = (data) => {
    setCurrentHabitDate(data);
    props.addHabitsDateInfo(habit_id, data);
  };

  const addSelectedDate = (date, dateElement) => {
    // add date which is not completed to temp container
    requestedAddHabitDateTemp[date] = true;
    if(date in requestedRemoveHabitDateTemp){
      delete requestedRemoveHabitDateTemp[date]
    }
    let currentHabitDateTemp = { ...currentHabitDate };
    currentHabitDateTemp.dates[date] = true;
    setCurrentHabitDateCustom(currentHabitDateTemp);

    axios
      .post(API_URL + "/api/habit-date/" + habit_id, {
        date: date,
      })
      .then((response) => {
        // remove from temp container if the request is completed 
        delete requestedAddHabitDateTemp[date];
      })
      .catch((error) => {
        // remove from temp container if the request is completed 
        delete requestedAddHabitDateTemp[date];
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
          setCurrentHabitDateCustom(currentHabitDateTemp);
          contextStore.showUnexpectedError();
        }
      });
  };
  const removeSelectedDate = (date, dateElement) => {
    // add date which is not completed to temp container
    requestedRemoveHabitDateTemp[date] = true;
    if(date in requestedAddHabitDateTemp){
      delete requestedAddHabitDateTemp[date]
    }
    let currentHabitDateTemp = { ...currentHabitDate };
    delete currentHabitDateTemp.dates[date];
    setCurrentHabitDateCustom(currentHabitDateTemp);

    axios
      .delete(API_URL + "/api/habit-date/" + habit_id, {
        data: {
          date: date,
        },
      })
      .then((response) => {
        // remove from temp container if the request is completed 
        delete requestedRemoveHabitDateTemp[date];

      })
      .catch((error) => {
        // remove from temp container if the request is completed 
        delete requestedRemoveHabitDateTemp[date];
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
          setCurrentHabitDateCustom(currentHabitDateTemp);
          // dateElement.classList.add("calendar-day--selected");
          contextStore.showUnexpectedError();
        }
      });
  };
  let onDateClick = (clickedDate) => {
    if (clickedDate in props.habitsDateInfo[habit_id].dates) {
      removeSelectedDate(clickedDate);
    } else {
      addSelectedDate(clickedDate);
    }
  };
  let getHabitDate = () => {
    if (true) {
      // if (!currentHabitDate) {
      setGetHabitDateLoading(true);
      axios
        .get(API_URL + "/api/habit-date/" + habit_id)
        .then((response) => {
          setGetHabitDateLoading(false);
          // add currently pending add date request
          // if the request is successful no need to add because the the response of this request most likely has that date
          response.data.dates = {
            ...response.data.dates,
            ...requestedAddHabitDateTemp,
          };
          for(let ele in requestedRemoveHabitDateTemp){
            if(ele in response.data.dates){
              delete response.data.dates[ele]
            }
            }
          // remove currently pending remove date request
          setCurrentHabitDateCustom(response.data);
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
  useEffect(() => {
    // effect
    console.log("dhfbgfdbgkfdbg");
    // getHabitDate();
    return () => {
      // cleanup
    };
  }, [currentHabitDate]);
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
          <h2>
            {/* <Button onClick={props.onSideDrawerOpen} size="sm" mr={2}> */}
            <HamburgerIcon
              onClick={props.onSideDrawerOpen}
              mr={2}
              className="side-drawer-menu"
            />
            {/* </Button> */}
            {currentHabitDate.habit_name}
          </h2>
          <Calendar
            selectedDate={currentHabitDate}
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