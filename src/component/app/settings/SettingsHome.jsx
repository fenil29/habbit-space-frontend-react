import React from "react";
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
import  SettingsOption from "./SettingsOption";
import  SettingsContent from "./SettingsContent";

import "./SettingsHome.scss";

function SettingsHome(props) {
  return (
    <Box className="setting-home" boxShadow="xl">
    <SettingsOption
      isSideDrawerOpen={props.isSideDrawerOpen}
      onSideDrawerOpen={props.onSideDrawerOpen}
      onSideDrawerClose={props.onSideDrawerClose}
    />
    <SettingsContent/>
  </Box>
  );
}

export default SettingsHome;
