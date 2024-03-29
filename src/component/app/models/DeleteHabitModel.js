import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { API_URL } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";

import axios from "axios";

function DeleteHabitModel(props) {
  const toast = useToast()

  const contextStore = useContext(GlobalContext);

  const [deleteHabitLoading, setDeleteHabitLoading] = useState(false);
  let deleteHabit = (habitName) => {
    setDeleteHabitLoading(true);
    axios
      .delete(API_URL + "/api/habit/" + props.habitInfo.habit_id)
      .then((response) => {
        setDeleteHabitLoading(false);
        if(response.status===200){
        props.onClose();
        toast({
            position: "bottom-left",
            title: "Habit deleted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          props.onHabitsSuccessfulDelete(props.habitInfo.habit_id)
        }
        else{
          contextStore.showUnexpectedError();

        }
      })
      .catch((error) => {
          console.log(error)
        setDeleteHabitLoading(false);
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

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Are You Sure ?{/* You want to permanently delete ... habit */}
        </ModalHeader>
        <ModalCloseButton />
        <hr />
        <ModalBody pb={6}>
          This action will permanently delete your habit{" "}
          <mark>{" "}{props.habitInfo.habit_name}</mark> {" "}with all of it's data. This
          process cannot be undone.
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} isLoading={deleteHabitLoading} onClick={deleteHabit}  variant="outline">
            Delete
          </Button>
          <Button onClick={props.onClose}  variant="outline">Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteHabitModel;
