import React from "react";
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
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";

function AddHabitModel(props) {
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
            props.onAddHabit(values.habitName);
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
                // colorScheme="blue"
                isLoading={props.addHabitLoading}
                // loadingText="Adding"
                type="submit"
                customColor="blue"
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
