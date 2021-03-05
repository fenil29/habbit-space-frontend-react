import React, { useEffect } from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

let colorList = [
  "--primary-color",
  "--primary-color-hover",
  // "--primary-background-color",
  "--secondary-background-color",
  "--secondary-background-color-hover",
  "--primary-font-color",
  // "--secondary-font-color",
];

function DarkModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  let toggleColorModeCustom = () => {
    toggleColorMode();
  };
  let AdjustCustomColorMode = () => {
    for (let i of colorList) {
      document.documentElement.style.setProperty(
        i,
        colorMode === "light"
          ? `var(--light-mode${i.slice(1)})`
          : `var(--dark-mode${i.slice(1)})`
      );
    }
  };
  React.useEffect(() => {
    console.log(colorMode);
    AdjustCustomColorMode();
  }, [colorMode]);

  useEffect(() => {
    // effect
    AdjustCustomColorMode();
    return () => {
      // cleanup
    };
  }, []);
  return (
    <Button size="md" margin="5px" onClick={toggleColorModeCustom}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}

export default DarkModeButton;
