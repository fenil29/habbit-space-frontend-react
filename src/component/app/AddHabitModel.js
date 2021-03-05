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
} from "@chakra-ui/react";

function AddHabitModel(props) {
  const initialRef = React.useRef();

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Habit</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Habit Name</FormLabel>
            <Input placeholder="Habit Name" ref={initialRef} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button 
          // colorScheme="blue"
          className="primary"
           mr={3}>
            Add
          </Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddHabitModel;
