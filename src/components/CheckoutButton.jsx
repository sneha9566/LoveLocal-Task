import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Badge, Text, useBreakpointValue } from '@chakra-ui/react';
import { ReactSVG } from 'react-svg';
import cartIcon from "../assets/icons/cartIcon.svg"

const CheckoutButton = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isMobileScreen = useBreakpointValue({ base: true, md: true, lg:false });
  const isMobileScreenHeader = useBreakpointValue({ base: true, md: true,lg:true,xl:false });

  return (
    <Button 
    variant={isMobileScreenHeader ? "" : "outline"}
    borderColor="primary.500"
    bg="none"
    color="primary.500"
    _hover={{
        bg: 'none',
      }}
    >
      <ReactSVG src={cartIcon} />
      
      {cartItems?.length > 0 && (
        <Badge
          borderRadius="full"
          bg="primary.500"
          color="white"
          fontSize="sm"
          fontWeight="bold"
          px={2}
          py={1}
          ml={-3}
        >
          {cartItems.length}
        </Badge>
      )}
      {
          isMobileScreen ? "" :  <Text ml="10px">My Cart</Text>
      }
      
    </Button>
  );
};

export default CheckoutButton;
