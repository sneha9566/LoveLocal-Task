// chakra-theme.js
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    primary: {
        50: '#FCE5F0',
        100: '#F8C8E5',
        200: '#F29BDA',
        300: '#EC6ED0',
        400: '#E541C5',
        500: '#B8238E', // Original color
        600: '#A71C7B',
        700: '#98186F',
        800: '#881564',
        900: '#78125A',
      },
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Helvetica, sans-serif',
    // Add more custom fonts here
  },
  // Add more theme configurations here
});

export default customTheme;
