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
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { API_URL } from "../../../Constants";
import { GlobalContext } from "../../../context/GlobalState";
import {  useHistory } from "react-router-dom";

import axios from "axios";

function DeleteAccountModel(props) {
  let history = useHistory();

  const contextStore = useContext(GlobalContext);

  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);
  const toast = useToast();

  const initialRef = React.useRef();
  function validateName(value) {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (value !== props.accountInfo.email) {
      error = "Invalid email address";
    }
    return error;
  }
  let deleteAccount = (habitName) => {
    setDeleteAccountLoading(true);
    axios
      .delete(API_URL + "/api/account")
      .then((response) => {
        if (response.status === 200) {
          setDeleteAccountLoading(false);
          // console.log(response);
          // setHabitList(response.data);
          contextStore.setLoginData({ isLoggedIn: false });

          toast({
            position: "bottom-left",
            title: "Account Successfully Deleted",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          history.push("/");
        } else {
          contextStore.showUnexpectedError();
        }
      })
      .catch((error) => {
        setDeleteAccountLoading(false);
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
          initialValues={{ Email: "" }}
          onSubmit={(values, actions) => {
            deleteAccount();
          }}
        >
          <Form>
            <ModalHeader> Are You Sure ?</ModalHeader>
            <ModalCloseButton />
            <hr />
            <ModalBody pb={6}>
              This action will permanently delete your Account with all of it's
              data. This process cannot be undone.
              <Field name="Email" validate={validateName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.Email && form.touched.Email}
                  >
                    <FormLabel htmlFor="Email" mt={3}>
                      {" "}
                      Please enter your email address to confirm
                    </FormLabel>
                    <Input {...field} id="Email" placeholder="Email" />
                    <FormErrorMessage>{form.errors.Email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                isLoading={deleteAccountLoading}
                // loadingText="Adding"
                type="submit"
                // customColor="blue"
                variant="outline"
                mr={3}
              >
                Delete
              </Button>
              <Button onClick={props.onClose} variant="outline">
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export default DeleteAccountModel;
