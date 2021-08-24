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

function AddHabitModel(props) {
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
  let addHabit = (habitName) => {
    setAddHabitLoading(true);
    axios
      .post(API_URL + "/api/habit", {
        habit_name: habitName,
      })
      .then((response) => {
        setAddHabitLoading(false);
        if(response.status===200){
        // console.log(response);
        // setHabitList(response.data);
        props.onHabitsSuccessfulAdd(response.data);
        toast({
          position: "bottom-left",
          title: "Habit added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      }
      else{
        contextStore.showUnexpectedError();

      }
      })
      .catch((error) => {
        setAddHabitLoading(false);
        // console.log(error);
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
          initialValues={{ habitName: "" }}
          onSubmit={(values, actions) => {
            // alert(JSON.stringify(values));
            addHabit(values.habitName);
          }}
        >
          <Form>
            <ModalHeader>Add New Habit</ModalHeader>
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
                colorScheme="blue"
                variant="outline"
                isLoading={addHabitLoading}
                // loadingText="Adding"
                type="submit"
                // customColor="blue"
                mr={3}
              >
                Add
              </Button>
              <Button onClick={props.onClose}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export default AddHabitModel;
