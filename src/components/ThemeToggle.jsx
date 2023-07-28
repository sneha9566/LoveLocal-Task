// ThemeToggle.js
import React from 'react';
import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import './styles/styles.scss';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label={`Switch to ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`} placement="top-end">
    <IconButton
     className="themeToggleButton"
      justifyContent="end" 
      width="100%" 
      pr="60px"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon color="primary.500" />}
      onClick={toggleColorMode}
      size="md"
      variant="ghost"
      backgroundColor="none"     
    />
    </Tooltip>
  );
};

export default ThemeToggle;
