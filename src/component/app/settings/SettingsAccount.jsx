import React, { useEffect, useContext } from "react";

import "./SettingsAccount.scss";
import { GlobalContext } from "../../../context/GlobalState";

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
  Wrap,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

function SettingsAccount() {
  const contextStore = useContext(GlobalContext);
  console.log(contextStore.loginData);
  let loginData = contextStore.loginData;
  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.length > 100) {
      error = "Please enter valid Name!";
    }
    return error;
  }
  return (
    <div className="settings-account">
      <Wrap className="settings-avatar">
        <WrapItem>
          <Avatar
            size="2xl"
            name={loginData.first_name}
            src={loginData.picture}
          />
        </WrapItem>
      </Wrap>
      <Formik
        initialValues={{
          FirstName: loginData.first_name,
          LastName: loginData.last_name,
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Field name="FirstName" validate={validateName}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.FirstName && form.touched.FirstName}
                >
                  <FormLabel htmlFor="FirstName">First Name</FormLabel>
                  <Input {...field} id="FirstName" placeholder="FirstName" />
                  <FormErrorMessage>{form.errors.FirstName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <br />
            <Field name="LastName" validate={validateName}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.LastName && form.touched.LastName}
                >
                  <FormLabel htmlFor="LastName">Last Name</FormLabel>
                  <Input {...field} id="LastName" placeholder="LastName" />
                  <FormErrorMessage>{form.errors.LastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              customColor="blue"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Button mt={4} leftIcon={<EditIcon />} customColor="blue" variant="solid">
        Edit
      </Button>
      <br />
      <Button
        mt={4}
        leftIcon={<DeleteIcon />}
        colorScheme="red"
        variant="outline"
      >
        Delete Account
      </Button>
    </div>
  );
}

export default SettingsAccount;
