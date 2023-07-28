import React from 'react';
import { Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../redux/cartSlice'; // Replace '../path-to-cartSlice' with the correct path to your cartSlice

const CustomAddButton = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);

  const handleButtonClick = (event) => {
    event.stopPropagation();
    if (isItemInCart) {
      dispatch(removeItemFromCart(item.id));
    } else {
      dispatch(addItemToCart(item));
    }
  };

  return (
    <Button size="sm" color="primary.500" variant="outline" fontSize="sm" borderColor="primary.500" onClick={handleButtonClick} colorScheme={isItemInCart ? 'red' : 'primary.500'} leftIcon={isItemInCart ? '-' : '+'}>
      {isItemInCart ? 'REMOVE' : 'ADD'}
    </Button>
  );
};

export default CustomAddButton;


