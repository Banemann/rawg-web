import { Switch, useColorMode } from "@chakra-ui/react";

export const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Switch colorScheme="green" isChecked={colorMode === "dark"} onChange={toggleColorMode} />
  );
};