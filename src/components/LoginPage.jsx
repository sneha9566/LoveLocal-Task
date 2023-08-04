// LoginPage.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setToken } from '../redux/authSlice';
import { useHistory } from 'react-router-dom';
import { setLoginStatus } from '../redux/authSlice';
import { useToast } from '@chakra-ui/react';

import { Box, Flex, Heading, Input, Button, FormControl, FormLabel, Card } from '@chakra-ui/react';

const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useHistory(); // Initialize useHistory
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleLogin = async () => {
      if (!username || !password) {
        toast({
          title: 'Error',
          description: 'Please enter both username and password.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return; 
      }
    
      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
    
        const data = await response.json();
    
        if (response.ok && data.token) {
          // dispatch(setToken(data.token));
          dispatch(setLoginStatus(true));
          // Save login status in localStorage
          localStorage.setItem('isLoggedIn', 'true');
          history.push('/category/All');
        } else {
          toast({
            title: 'Error',
            description: 'Wrong username or password. Please try again.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Error logging in:', error);
        toast({
          title: 'Error',
          description: 'Wrong username or password. Please try again.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    };
    

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Flex justify="center" align="center" h="100vh">
      <Card p={6} minWidth="400px" boxShadow="md">
        <Heading textAlign="center" mb={4}>
          Login
        </Heading>
        <FormControl id="username" mb={4}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>
        <Button bg="primary.500" color="#fff" width="full" onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </Flex>
    </motion.div>
  );
};

export default LoginPage;
