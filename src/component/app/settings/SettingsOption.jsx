import React from "react";
import "./SettingsOption.scss";

import {
  Box,
  Center,
  List,
  ListItem,
  Button,
  useDisclosure,
  Stack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { NavLink, useHistory } from "react-router-dom";

import { GlobalContext } from "../../../context/GlobalState";

function SettingsOption(props) {
  return (
    <div>
      <Box className="settings-option settings-option-main">
        <Box className="title">
          <h2>Settings</h2>
        </Box>
        <List>
          <NavLink
            to={"/app/settings/habits"}
            activeClassName="is-active-habit"
          >
            <ListItem>habits</ListItem>
          </NavLink>
          <NavLink
            to={"/app/settings/account"}
            activeClassName="is-active-habit"
          >
            <ListItem>account</ListItem>
          </NavLink>
        </List>
      </Box>
    </div>
  );
}

export default SettingsOption;
