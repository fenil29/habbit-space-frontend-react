import React from "react";
import Logo from "../../Logo";
import "./AppNavBar.scss";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

function AppNavBar() {
  return (
    <div className="nav-bar">
      <div className="nav-bar-content">
        <Link to="/">
          <Logo />
        </Link>
        <div className="right">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              _focus={{ boxShadow: "none" }}
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
