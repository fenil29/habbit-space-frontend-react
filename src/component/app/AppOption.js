import React from "react";
import "./AppOption.scss";
import {
  Box,
  Center,
  List,
  ListItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

import AddHabitModel from "./AddHabitModel";

function AppOption() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box className="app-option">
        <Box className="title">
          <h2>All Habits</h2>
        </Box>
        <List>
          <ListItem>Today</ListItem>
        </List>
        <br />

        <Box className="title">
          <h2>Habits</h2>
        </Box>
        {/* <Divider /> */}
        <List>
          {/* <ListItem>
            <ListIcon as={CheckIcon} />
            Lorem ipsum dolor sit amet
          </ListItem> */}
          <ListItem>Reading</ListItem>
          <ListItem>Learn Code</ListItem>
          <ListItem>System Design</ListItem>
        </List>
        <Center className="add-habit-button-container">
          <Button
            colorScheme="blue"
            // variant="outline"
            size="sm"
            onClick={onOpen}
          >
            Add Habit
          </Button>
        </Center>
        {/* add habit model */}
        <AddHabitModel isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
}

export default AppOption;
