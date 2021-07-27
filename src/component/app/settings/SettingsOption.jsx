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
  const OptionComponent = (localProps) => (
    <>
      <Box
        className={
          localProps.type === "drawer"
            ? "settings-option settings-option-drawer"
            : "settings-option settings-option-main"
        }
      >
        <Box className="title">
          <h2>Settings</h2>
        </Box>
        <List>
          <NavLink
            to={"/app/settings/account"}
            activeClassName="is-active-habit"
            onClick={() => {
              props.onSideDrawerClose();
            }}
          >
            <ListItem>account</ListItem>
          </NavLink>
          <NavLink
            to={"/app/settings/habits"}
            activeClassName="is-active-habit"
            onClick={() => {
              props.onSideDrawerClose();
            }}
          >
            <ListItem>habits</ListItem>
          </NavLink>
        </List>
      </Box>
    </>
  );
  const OptionComponentMain = () => (
    <>
      <OptionComponent type="main" />
    </>
  );
  const OptionComponentDrawer = () => (
    <>
      <Drawer
        isOpen={props.isSideDrawerOpen}
        onClose={props.onSideDrawerClose}
        placement="left"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Habit Tracker</DrawerHeader>
            <DrawerBody p={0}>
              <OptionComponent type="drawer" />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
  return (
    <div>
      <OptionComponentMain />
      <OptionComponentDrawer />
    </div>
  );
}

export default SettingsOption;
