import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { Box, Stack, Skeleton, Button } from "@chakra-ui/react";
import "./HabitView.scss";
import Calendar from "./calendar/Calendar";

import { API_URL } from "../../Constants";
import { GlobalContext } from "../../context/GlobalState";

import axios from "axios";

import { HamburgerIcon } from "@chakra-ui/icons";

import { io } from "socket.io-client";

let requestedAddHabitDateTemp = {};
let requestedRemoveHabitDateTemp = {};
function HabitView(props) {
  let { habit_id } = useParams();
  // let habit_id="7fe93df8-5f85-4560-9149-d30de45a0bc5"
  const contextStore = useContext(GlobalContext);
  const [getHabitDateLoading, setGetHabitDateLoading] = useState(true);

  const setCurrentHabitDateCustom = (data) => {
    props.addHabitsDateInfo(habit_id, data);
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
    let currentHabitDateTemp = { ...props.habitsDateInfo[habit_id] };
    currentHabitDateTemp.dates[date] = true;
    setCurrentHabitDateCustom(currentHabitDateTemp);

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
          let currentHabitDateTemp = { ...props.habitsDateInfo[habit_id] };
          delete currentHabitDateTemp.dates[date];
          setCurrentHabitDateCustom(currentHabitDateTemp);
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
    let currentHabitDateTemp = { ...props.habitsDateInfo[habit_id] };
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
          let currentHabitDateTemp = { ...props.habitsDateInfo[habit_id] };
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
      // if (!props.habitsDateInfo[habit_id]) {
      setGetHabitDateLoading(true);
      axios
        .get(API_URL + "/api/habit-date/" + habit_id)
        .then((response) => {
          setGetHabitDateLoading(false);
          // add currently pending add date request
          // if the request is successful no need to add because the the response of this request most likely has that date
          response.data.dates = {
            ...response.data.dates,
            ...requestedAddHabitDateTemp[habit_id],
          };
          if (requestedRemoveHabitDateTemp[habit_id]) {
            for (let ele in requestedRemoveHabitDateTemp[habit_id]) {
              if (ele in response.data.dates) {
                delete response.data.dates[ele];
              }
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

  let changeCurrentStateFromSocket = (data) => {
    console.log("changeCurrentStateFromSocket");

    if (data.habit_id == habit_id) {
      if (data.add) {
        let currentHabitDateTemp = { ...props.habitsDateInfo[habit_id] };
        console.log(
          props.habitsDateInfo[habit_id],
          props.habitsDateInfo[habit_id],
          currentHabitDateTemp.dates
        );
        currentHabitDateTemp.dates[data.add.date] = data.add[data.add.date];
        setCurrentHabitDateCustom(currentHabitDateTemp);
      } else if (data.remove) {
        let currentHabitDateTemp = { ...props.habitsDateInfo[habit_id] };
        delete currentHabitDateTemp.dates[data.remove.date];
        console.log(
          props.habitsDateInfo[habit_id],
          props.habitsDateInfo[habit_id],
          currentHabitDateTemp.dates,
          data.remove.date
        );
        setCurrentHabitDateCustom(currentHabitDateTemp);
      }
    } else {
      if (props.habitsDateInfo[data.habit_id]) {
        if (data.add) {
          let currentHabitDateTemp = {
            ...props.habitsDateInfo[data.habit_id],
          };
          currentHabitDateTemp.dates[data.add.date] = data.add[data.add.date];
          props.addHabitsDateInfo(data.habit_id, currentHabitDateTemp);
        } else if (data.remove) {
          let currentHabitDateTemp = {
            ...props.habitsDateInfo[data.habit_id],
          };
          delete currentHabitDateTemp.dates[data.remove.date];
          props.addHabitsDateInfo(data.habit_id, currentHabitDateTemp);
        }
      }
    }
  };
  useEffect(() => {
    // const socket = io(API_URL, {path: '/api/socket.io'});
    // effect
    // console.log(habit_id);
    console.log(props.habitsDateInfo);
    if (!props.habitsDateInfo[habit_id]) {
      getHabitDate();
    }

    // socket.on("habit change", (data) => {
    //   console.log(data);
    //   if (data.add) {
    //     let currentHabitDateTemp = { ...props.habitsDateInfo[habit_id] };
    //     console.log(
    //       props.habitsDateInfo[habit_id],
    //       currentHabitDateTemp,
    //       currentHabitDateTemp.dates
    //     );
    //     currentHabitDateTemp.dates[data.add.date] = data.add[data.add.date];
    //     setCurrentHabitDateCustom(currentHabitDateTemp);
    //   }
    // });
    return () => {
      // cleanup
    };
  }, []);
  return (
    <Box className="habit-view-container">
      {!props.habitsDateInfo[habit_id] ? (
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
            {props.habitsDateInfo[habit_id].habit_name}
          </h2>
          <hr className="habit-bottom-ht" />
          <Calendar
            selectedDate={props.habitsDateInfo[habit_id].dates}
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
