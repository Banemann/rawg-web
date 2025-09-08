import { ColorModeSwitch } from './ColorModeSwitch';
import logo from '/src/assets/logo.webp';
import { HStack, Image } from '@chakra-ui/react';


export const NavBar = () => {
  return (
    <HStack spacing={4} alignItems="center">
      <Image src={logo} alt="Logo" boxSize="50px" objectFit="cover" />
      <ColorModeSwitch />
    </HStack>
  );
}