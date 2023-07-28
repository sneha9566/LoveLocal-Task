
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Text, Image, Flex, Heading, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import { setProductDetails } from '../redux/productDetailsSlice';
import axios from 'axios';
import { StarIcon } from '@chakra-ui/icons';
import CustomAddButton from '../Customcomponent/CustomAddButton';


const ProductDetails = () => {
  const { productId, productName } = useParams();
  const isMobileScreenHeader = useBreakpointValue({ base: true,sm:false, md: true,lg:true,xl:false });

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails.productDetails);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        dispatch(setProductDetails(response.data));
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [dispatch, productId]);

  if (!productDetails) {
    return <Text>Loading product details...</Text>;
  }

  const { title, description, image, price,rating } = productDetails;

const renderStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={index} color="yellow.400" />
      ))}
      {hasHalfStar && <StarIcon color="yellow.400" />}
      {[...Array(emptyStars)].map((_, index) => (
        <StarIcon key={index} color="gray.300" />
      ))}
    </>
  );
};


  return (
    
    <Box top={isMobileScreenHeader?"30":"-35px"} color="#000" ml={isMobileScreenHeader?"70":"140px"} mr={isMobileScreenHeader?"70":"140px"} className="pageOverlap"  p="60px">
    <Flex borderBottom='2px' borderColor='gray.100' alignItems="center" mt={8}>
      <Box  w="40%" mr={8}>
        <Image pb="30px" w="370px" h="370px"  src={image} alt={title} />
      </Box>
      <Box w="60%">
        <Text className="bg-blue-500 text-white p-4" fontSize={isMobileScreenHeader?"xl":"2xl"} fontWeight="bold" mb={4}>{title}</Text> 
        <Text fontSize="md" fontWeight="500" mb={4}>Product MRP: &nbsp;  &#8377;{price}</Text>

        <Flex>
        {renderStarRating(rating.rate)}
        <Text mb="20px" ml={2} fontSize="sm" color="gray.600">
          {rating.rate}
        </Text>
        </Flex> 
        <CustomAddButton pl="30px" pr="30px" buttonText="ADD" colorScheme="blue" size="md" />  
      </Box>
    </Flex>
    <Box  color="#000" pt="30px" w="100%">
        <Heading  as='h2' size='md' noOfLines={2}>
        About this product
        </Heading> 
        <Text mt="20px">{description}</Text>
    </Box>
    </Box>
  );
};

export default ProductDetails;

