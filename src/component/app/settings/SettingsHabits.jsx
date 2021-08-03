import React, { useState, useEffect, useContext } from "react";
import "./SettingsHabits.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { HamburgerIcon, DeleteIcon, AddIcon, EditIcon } from "@chakra-ui/icons";

import {
  Button,
  Stack,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { API_URL } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";
import AddHabitModel from "../models/AddHabitModel";
import DeleteHabitModel from "../models/DeleteHabitModel";
import EditHabitModel from "../models/EditHabitModel";

import axios from "axios";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function SettingsHabits() {
  const contextStore = useContext(GlobalContext);
  const [habitList, setHabitList] = useState([]);
  const [getHabitListLoading, setGetHabitListLoading] = useState(false);
  const [deleteHabitInfo, setDeleteHabitInfo] = useState({});
  const [editHabitInfo, setEditHabitInfo] = useState({});

  const {
    isOpen: isOpenAddHabitModel,
    onOpen: onOpenAddHabitModel,
    onClose: onCloseAddHabitModel,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteHabitModel,
    onOpen: onOpenDeleteHabitModel,
    onClose: onCloseDeleteHabitModel,
  } = useDisclosure();
  const {
    isOpen: isOpenEditHabitModel,
    onOpen: onOpenEditHabitModel,
    onClose: onCloseEditHabitModel,
  } = useDisclosure();

  let getHabit = () => {
    setGetHabitListLoading(true);
    axios
      .get(API_URL + "/api/habit")
      .then((response) => {
        setGetHabitListLoading(false);
        setHabitList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setGetHabitListLoading(false);
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
  let setAllHabitPosition = (newHabitList) => {
    let allHabitPositionIds = [];
    newHabitList.forEach((habit) => {
      console.log(habit.habit_id);
      allHabitPositionIds.push(habit.habit_id);
    });

    console.log(allHabitPositionIds);
    axios
      .post(API_URL + "/api/all-habit-position", allHabitPositionIds)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        contextStore.showUnexpectedError();
      });
  };
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newHabitList = reorder(
      habitList,
      result.source.index,
      result.destination.index
    );
    // console.log(newHabitList);
    setAllHabitPosition(newHabitList);
    setHabitList(newHabitList);
  }
  let onHabitsSuccessfulAdd = (newHabit) => {
    onCloseAddHabitModel();
    setHabitList([...habitList,newHabit]);
  };
  let onHabitsSuccessfulDelete = (deletedHabitId) => {
     let newHabitList =  habitList.filter(habit=>(habit.habit_id != deletedHabitId))
     setHabitList(newHabitList)
  };
  let onHabitsSuccessfulEdit = (editedHabit) => {
    let newHabitList =  habitList.map(habit=>{

      if(habit.habit_id==editedHabit.habit_id){
        habit.habit_name=editedHabit.habit_name
      }
      return habit
    })
    setHabitList(newHabitList)
  };
  useEffect(() => {
    // effect
    getHabit();

    return () => {
      // cleanup
    };
  }, []);
  return (
    <div className="settings-habits">
      <div className="title-container">
        <span className="title">Habits</span>
        <Button
          colorScheme="blue"
          size="sm"
          variant="outline"
          onClick={() => {
            onOpenAddHabitModel();
          }}
        >
          <AddIcon
            //   w={4}
            //   h={4}
            mr={2}
          />
          Add Habit
        </Button>
      </div>
      {getHabitListLoading ? (
        <Stack mt={2}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  //   style={getListStyle(snapshot.isDraggingOver)}
                  className={
                    snapshot.isDraggingOver
                      ? "habit-list-container"
                      : "habit-list-container is-dragging-over-container"
                  }
                >
                  {habitList.map((habit, index) => (
                    <Draggable
                      key={habit.habit_id}
                      draggableId={habit.habit_id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          // style={getItemStyle(
                          //   snapshot.isDragging,
                          //   provided.draggableProps.style
                          // )}
                          className={
                            !snapshot.isDragging
                              ? "habit-list-item"
                              : "habit-list-item is-dragging-over-item"
                          }
                        >
                          {habit.habit_name}
                          <div>
                            <DeleteIcon
                              w={4}
                              h={4}
                              mr={3}
                              className="habit-option-icon"
                              onClick={() => {
                                setDeleteHabitInfo({})
                                setDeleteHabitInfo(habit)
                                onOpenDeleteHabitModel();
                              }}
                            />
                            <EditIcon
                              w={4}
                              h={4}
                              mr={3}
                              className="habit-option-icon"
                              onClick={() => {
                                setEditHabitInfo({})
                                setEditHabitInfo(habit)
                                onOpenEditHabitModel();
                              }}
                            />
                            <HamburgerIcon
                              w={5}
                              h={5}
                              onClick={() => {}}
                              className="habit-option-icon"
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
      <AddHabitModel
        isOpen={isOpenAddHabitModel}
        onClose={onCloseAddHabitModel}
        onHabitsSuccessfulAdd={onHabitsSuccessfulAdd}
      />
      <DeleteHabitModel
        isOpen={isOpenDeleteHabitModel}
        onClose={onCloseDeleteHabitModel}
        habitInfo={deleteHabitInfo}
        onHabitsSuccessfulDelete={onHabitsSuccessfulDelete}
      />
      <EditHabitModel
        isOpen={isOpenEditHabitModel}
        onClose={onCloseEditHabitModel}
        habitInfo={editHabitInfo}
        onHabitsSuccessfulEdit={onHabitsSuccessfulEdit}
      />
    </div>
  );
}

export default SettingsHabits;
