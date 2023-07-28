import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  InputLeftElement,
  InputGroup,
  Input,
  useColorModeValue,
  useBreakpointValue
} from '@chakra-ui/react';
// import { Box, Flex, Heading, Input, InputGroup, InputLeftElement, Button, Text, Spacer } from '@chakra-ui/react';
import { SearchIcon, ChevronRightIcon, HamburgerIcon } from '@chakra-ui/icons';
import {ReactSVG} from "react-svg";
import logoIcon from "../assets/icons/logo.svg";
import cartIcon from "../assets/icons/cartIcon.svg"
import { NavLink } from 'react-router-dom'; 
import '../components/styles/styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutButton from '../components/CheckoutButton';
import ThemeToggle from '../components/ThemeToggle';
import { useHistory } from 'react-router-dom';
import { setLoginStatus } from '../redux/authSlice';

const Header = ({ onSearch }) => {
    const history = useHistory();
    const dispatch = useDispatch();
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const isMobileScreen = useBreakpointValue({ base: true, md: false });
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    dispatch(setLoginStatus(false));
    history.push('/login');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const backgroundColor = useColorModeValue('#fff', '#1a202c');
  const navLinkColor = useColorModeValue('#000', '#fff');


 
  return (

    <>
      {isLoggedIn ? (
        <Box pl="60px" pr="60px" position="fixed" zIndex="2" w="100%" py={4}>
          <Box  pl={isMobileScreen ? "10px":"60px"} pr={isMobileScreen ? "10px":"60px"} top="0"  position="fixed" zIndex="3" w="100%" py={4}  >
          <Flex align="center" justify="space-between" px={4}>
            <Flex align="center">
              <Heading color="white" size="md">
                <ReactSVG src={logoIcon} />
              </Heading>
              <Box color="white" fontSize="sm" ml={4}>
                {/* <span>Live Location:</span> <span>Some Location</span> */}
              </Box>
            </Flex>

        <Box maxW="md" width="100%">
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
              <SearchIcon />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search for products..."
              bg="white"
              rounded="full"
              _focus={{ borderColor: 'teal.500', boxShadow: 'outline' }}
              onChange={handleInputChange} 
            />
          </InputGroup>
        </Box>
        {/* Hamburger Icon (For Mobile Menu) */}
        <Box display={{ base: 'block', md: 'none' }}>
         <Flex>
         <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant={isMobileScreen ? "" : "outline"}
              onClick={handleMenuToggle}
            />
            <MenuList>
              <MenuItem onClick={handleMenuItemClick}>
                <NavLink to="/shop">Shops</NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuItemClick}>
                <NavLink to="/offers">Offers</NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuItemClick}>
                <NavLink to="/">Account</NavLink>
              </MenuItem>
            </MenuList>
            <CheckoutButton  />  
          </Menu>
        </Flex>   
         
        </Box>

        {/* NavLinks */}
        <Flex color={navLinkColor} className="navLinkStyle" align="center" display={{ base: 'none', md: 'flex' }}>
          <NavLink to="/shop" activeClassName="activeNavLink" className="navLink">
            Shops
          </NavLink>
          <NavLink to="/offers" activeClassName="activeNavLink" className="navLink">
            Offers
          </NavLink>
          <NavLink to="/" activeClassName="activeNavLink" className="navLink">
            Account
          </NavLink>
        </Flex>
        <CheckoutButton  />   
        {
        isMobileScreen ? null : (
            <Button bg="none" color="primary.500" size="sm" rightIcon={<ChevronRightIcon />} onClick={handleLogout}>
            Logout
            </Button>
        )
        }       
      </Flex>
    </Box>
        </Box>
      ) : (
        <Box pl="60px" pr="60px" position="fixed" zIndex="2" w="100%" py={4}>
          {/* ... your header content for non-logged-in users ... */}
        </Box>
      )}
      
    
    </>
  );
};

export default Header;
