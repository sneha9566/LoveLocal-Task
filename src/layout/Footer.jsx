import { Box, Flex, Text } from '@chakra-ui/react';
import ThemeToggle from '../components/ThemeToggle';

const Footer = () => {
  return (
      <>
       <ThemeToggle/>
    <Box bg="gray.800" py={4}>
      <Flex align="center" justify="center">
        <Text color="white">© {new Date().getFullYear()} LoveLocal Private Limited. All rights reserved.</Text>
      </Flex>
    </Box>
    </>
  );
};

export default Footer;
