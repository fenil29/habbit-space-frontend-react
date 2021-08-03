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
  FormControl,
  FormLabel,
  Input,
  // Form,
  // Field,
  FormErrorMessage,
  useToast 
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { API_URL } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";

import axios from "axios";

function EditHabitModel(props) {
  const contextStore = useContext(GlobalContext);

  const [addHabitLoading, setAddHabitLoading] = useState(false);
  const toast = useToast()


  const initialRef = React.useRef();
  function validateName(value) {
    let error;
    if (!value) {
      error = "Habit name is required";
    } else if (value.length > 200) {
      error = "Invalid input";
    }
    return error;
  }
  let editHabit = (habitName) => {
    setAddHabitLoading(true);
    axios
      .put(API_URL + "/api/habit/" +  props.habitInfo.habit_id, {
        habit_name: habitName,
      })
      .then((response) => {
        setAddHabitLoading(false);
        // console.log(response);
        // setHabitList(response.data);
        props.onClose();

        props.onHabitsSuccessfulEdit(response.data);
        toast({
          position: "bottom-left",
          title: "Habit added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      
      })
      .catch((error) => {
        setAddHabitLoading(false);
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

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />

      <ModalContent>
        <Formik
          initialValues={{ habitName: props.habitInfo.habit_name }}
          onSubmit={(values, actions) => {
            // alert(JSON.stringify(values));
            editHabit(values.habitName);
          }}
        >
          <Form>
            <ModalHeader>Edit New Habit</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Field name="habitName" validate={validateName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.habitName && form.touched.habitName}
                  >
                    <FormLabel htmlFor="habitName">Habit Name</FormLabel>
                    <Input {...field} id="habitName" placeholder="Habit Name" />
                    <FormErrorMessage>{form.errors.habitName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </ModalBody>
            <ModalFooter>
              <Button
                // colorScheme="blue"
                isLoading={addHabitLoading}
                // loadingText="Adding"
                type="submit"
                customColor="blue"
                mr={3}
              >
                Edit
              </Button>
              <Button onClick={props.onClose}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export default EditHabitModel;
