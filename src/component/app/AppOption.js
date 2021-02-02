import React from "react";
import "./AppOption.scss";
import {
  Box,
  useColorMode,
  Divider,
  Center,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

function AppOption() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Box className="app-option">
        <Center className="title">
          <h2>Habits</h2>
        </Center>
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
      </Box>
    </>
  );
}

export default AppOption;
