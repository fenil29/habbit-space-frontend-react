import React, { useContext } from "react";
import Logo from "../../Logo";
import "./AppNavBar.scss";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import DarkModeButton from "./DarkModeButton";


function AppNavBar(props) {

  return (
    <div className="nav-bar">
      <div className="nav-bar-content">
        <div className="left">
          <HamburgerIcon
            onClick={props.onSideDrawerOpen}
            mr={3}
            className="side-drawer-menu"
          />
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="right">
          <DarkModeButton />
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              customColor="light-blue"
            >
              Fenil Kaneria
            </MenuButton>
            <MenuList>
              <MenuItem>App</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Account</MenuItem>
              <MenuDivider />
              <MenuItem>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default AppNavBar;
