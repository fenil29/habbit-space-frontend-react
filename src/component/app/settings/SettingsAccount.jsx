import React, { useEffect, useContext, useState } from "react";

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
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { API_URL } from "../../../Constants";
import DeleteAccountModel from "../models/DeleteAccountModel";

import axios from "axios";

function SettingsAccount() {
  const contextStore = useContext(GlobalContext);
  const [editMode, setEditMode] = useState(false);
  const [editAccountLoading, setEditAccountLoading] = useState(false);
  const toast = useToast();
  const {
    isOpen: isOpenDeleteAccountModel,
    onOpen: onOpenDeleteAccountModel,
    onClose: onCloseDeleteAccountModel,
  } = useDisclosure();

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
          Email:loginData.email,
        }}
        onSubmit={(values, actions) => {
          setEditAccountLoading(true);
          axios
            .put(API_URL + "/api/account", {
              first_name: values.FirstName,
              last_name: values.LastName,
            })
            .then((response) => {
        if(response.status===200){
              
              setEditAccountLoading(false);
              console.log(response.data);
              // setHabitList(response.data);
              response.data.isLoggedIn = true;
              contextStore.setLoginData(response.data);
              toast({
                position: "bottom-left",
                title: "Account updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }else{
              contextStore.showUnexpectedError();

            }
            })
            .catch((error) => {
              setEditAccountLoading(false);
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
        }}
      >
        {(props) => (
          <Form>
            <Field name="Email">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel htmlFor="FirstName">Email</FormLabel>
                  <Input {...field} id="Email" placeholder="Email" disabled />
                </FormControl>
              )}
            </Field>
            <br/>
            <Field name="FirstName" validate={validateName}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.FirstName && form.touched.FirstName}
                  // isDisabled={!editMode}
                >
                  <FormLabel htmlFor="FirstName">First Name</FormLabel>
                  <Input
                    {...field}
                    id="FirstName"
                    placeholder="FirstName"
                    disabled={!editMode}
                  />
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
                  <Input
                    {...field}
                    id="LastName"
                    placeholder="LastName"
                    disabled={!editMode}
                  />
                  <FormErrorMessage>{form.errors.LastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {editMode && (
              <Button
                mt={4}
                // customColor="blue"
                isLoading={editAccountLoading}
                type="submit"
                colorScheme="blue"
                variant="outline"
              >
                Submit
              </Button>
            )}
          </Form>
        )}
      </Formik>
      {!editMode && (
        <div>
          <Button
            mt={4}
            leftIcon={<EditIcon />}
            colorScheme="blue"
            variant="outline"
            // customColor="blue"
            // variant="solid"
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit
          </Button>
        </div>
      )}
      <Button
        mt={4}
        leftIcon={<DeleteIcon />}
        colorScheme="red"
        variant="outline"
        onClick={() => {
          onOpenDeleteAccountModel();
        }}
      >
        Delete Account
      </Button>
      <DeleteAccountModel
        isOpen={isOpenDeleteAccountModel}
        onClose={onCloseDeleteAccountModel}
        accountInfo={contextStore.loginData}
      />
    </div>
  );
}

export default SettingsAccount;
