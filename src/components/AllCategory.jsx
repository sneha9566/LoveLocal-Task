import { useState, useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, VStack, HStack, Text, Button, Divider, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Spinner, Flex, Spacer, InputGroup, InputLeftElement, Input, useBreakpointValue, Stack } from '@chakra-ui/react';
import { fetchCategories } from '../redux/categoriesSlice';
import { setSelectedCategory } from '../redux/selectedCategorySlice';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import { setProductDetails } from '../redux/productDetailsSlice';
import Select from 'react-select';
import customStylesReactSelect from '../Customtheme/ReactSelectTheme';
import CustomAddButton from '../Customcomponent/CustomAddButton';
import { addItemToCart } from '../redux/cartSlice';
import axiosInstance from '../utils/axios/axios';
import {useDebounce,SortingOptions} from '../utils/helper';
import CustomButton from '../Customcomponent/CustomButton';
import { setLoginStatus } from '../redux/authSlice';

const AllCategory = ({ searchQuery }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const { categoryName } = useParams();
  const [firstPageLoad, setFirstPageLoad] = useState(true);
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const isMobileScreen = useBreakpointValue({ base: true, sm:true, md: false });
  const isMobileScreenTab = useBreakpointValue({ base: true, md: true,lg:true,xl:false });
  const observer = useRef();
  const lastCardRef = useRef(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const selectedCategory = useSelector((state) => state.selectedCategory.selectedCategory);
  const history = useHistory();

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });
  }, []);

  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(fetchCategories());
      setFirstPageLoad(false);
    }
  }, [dispatch, categories]);

  useEffect(() => {
    dispatch(setSelectedCategory(categoryName));
  }, [dispatch, categoryName]);

  const [selectedCategoryContent, setSelectedCategoryContent] = useState('');
  const debouncedSelectedCategory = useDebounce(selectedCategory, 300);

  const memoizedSelectedCategoryContent = useMemo(() => {
    return selectedCategoryContent;
  }, [selectedCategoryContent]);

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      setLoading(false);
      setLoadingMore(false);
      setCanLoadMore(true);
      setPage(1);
    };
  }, []);

  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (memoizedSelectedCategoryContent && lastCardRef.current) {
      observer.current.observe(lastCardRef.current);
    }
  }, [memoizedSelectedCategoryContent]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && canLoadMore) {
      if (!loadingMore) {
        setLoadingMore(true);
        loadMoreProducts()
          .then(() => setLoadingMore(false))
          .catch((error) => {
            console.error('Error loading more products:', error);
            setLoadingMore(false);
          });
      }
    }
  };

  const loadMoreProducts = async () => {
    if (!loading && canLoadMore) {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/category/${debouncedSelectedCategory}?limit=10&page=${page + 1}`
        );

        if (response.data.length > 0) {
          setPage((prevPage) => prevPage + 1);

          const totalProductsCountResponse = await axiosInstance.get(
            `/category/${debouncedSelectedCategory}`
          );
          const totalProductsCount = totalProductsCountResponse.data.length;

          setSelectedCategoryContent((prevContent) => {
            const newContent = [...prevContent, ...response.data];
            return newContent.length < totalProductsCount ? newContent : prevContent;
          });

          setCanLoadMore(true);
        } else {
          setCanLoadMore(false);
        }
      } catch (error) {
        console.error('Error fetching category content:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchCategoryContent = async () => {
      try {
        const url = debouncedSelectedCategory
          ? `/category/${debouncedSelectedCategory}`
          : 'https://fakestoreapi.com/products';
        const response = await axiosInstance.get(url);
        setSelectedCategoryContent(response.data);
      } catch (error) {
        console.error('Error fetching category content:', error);
        setSelectedCategoryContent(null);
      }
    };

    if (debouncedSelectedCategory || debouncedSelectedCategory === '') {
      fetchCategoryContent();
    }
  }, [debouncedSelectedCategory]);

  // Based on the category get the product related to it 
  const handleCategoryClick = (category) => {
    if (category === '') {
      dispatch(setSelectedCategory(''));
      history.push('/category/All');
    } else {
      dispatch(setSelectedCategory(category));
      history.push(`/category/${category}`);
    }
  };

  useEffect(() => {
    const isFirstLoad = history?.location?.pathname === '/category/All';
    const isCategoryPage = categories?.includes(categoryName);

    if (isFirstLoad && !isCategoryPage) {
      dispatch(setSelectedCategory(''));
      history.push('/category/All');
    }
  }, [history, categoryName, categories, dispatch]);

// On click card get product details 
  const handleCardClick = async (productId) => {
    try {
      const response = await axiosInstance.get(`/${productId}`);
      dispatch(setProductDetails(response.data));
      history.push(`/product/${productId}/${response.data.title}`);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };


 const sortedSelectedCategoryContent = useMemo(() => {
    if (memoizedSelectedCategoryContent) {
      switch (selectedSortOption) {
        case 'priceLowToHigh':
          return [...memoizedSelectedCategoryContent].sort((a, b) => a.price - b.price);
        case 'priceHighToLow':
          return [...memoizedSelectedCategoryContent].sort((a, b) => b.price - a.price);
        case 'rating':
          return [...memoizedSelectedCategoryContent].sort((a, b) => b.rating - a.rating);
        default:
          return memoizedSelectedCategoryContent;
      }
    }
    return [];
  }, [memoizedSelectedCategoryContent, selectedSortOption]);

const filteredSortedSelectedCategoryContent = useMemo(() => {
    return sortedSelectedCategoryContent.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedSelectedCategoryContent, searchQuery]);

 

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  

  return (
    <> 
     {isLoggedIn ? (  
      <Box h="100vh" pt={isMobileScreenTab ? "170px" : "140px"} pl={isMobileScreen ? "10px" : "60px"} pr={isMobileScreen ? "10px" : "60px"} display="flex">
      <Stack overflowY={isMobileScreen ? "scroll" : "auto"} pt="15px" width={isMobileScreen ? "400px" : "200px"} flexDirection={isMobileScreen ? "row" : "column"} position="fixed" spacing={4} align="stretch">
        <CustomButton
        buttonText="All"
          textTransform="capitalize"
          color="primary.500"
          key="All"
          borderRadius="0"
          variant={selectedCategory === '' ? 'solid' : 'ghost'}
          onClick={() => handleCategoryClick('')}
          width="100%"
          textAlign="left"
          justifyContent={isMobileScreen ? "center":"flex-start"}
          paddingLeft="1rem"
          mr={isMobileScreen ? "20px":"0"}
          fontSize={isMobileScreen ? "sm":"md"}
          _active={{
            ...(isMobileScreen ? { borderBottom: '1px solid #B8238E' } : { bg: 'primary.700', color: 'white' }),
          }}
          size={isMobileScreen ? "md":"lg"}
          _hover={{
            bg: 'primary.50',
          }}
          _before={{
            content: '""',
            position: 'absolute',
            top: isMobileScreen ? "auto":'0',
            left: 0,
            bottom: 0,
            width: '4px',
            borderTopLeftRadius: 'sm',
            borderBottomLeftRadius: 'sm',
            backgroundColor: 'primary.500',
            opacity: selectedCategory === '' ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
          // {...(isMobileScreen ? {
          //   _active:{ borderBottom: '1px solid #B8238E'},
          //  } : {})}
        />
          
        {categories?.map((category) => (
          <>  
          <CustomButton
           buttonText={category}
           textTransform="capitalize"
            color="primary.500"
            borderRadius="0"
            key={category}
            variant={selectedCategory === category ? 'solid' : 'ghost'}
            onClick={() => handleCategoryClick(category)}
            width="100%"
            textAlign="left"
            mr={isMobileScreen ? "20px":"0"}
            justifyContent={isMobileScreen ? "center":"flex-start"}
            paddingLeft="1rem"
            fontSize={isMobileScreen ? "sm":"md"}
            size={isMobileScreen ? "md":"lg"}
            position="relative"
            _active={{
              ...(isMobileScreen ? { borderBottom: '1px solid #B8238E' } : { bg: 'primary.700', color: 'white' }),
            }}
            _hover={{
              bg: 'primary.50',
            }}
            _before={{
              content: '""',
              position: 'absolute',
              top: isMobileScreen ? "auto":'0',
              left: 0,
              bottom: 0,
              width: '4px',
              borderTopLeftRadius: 'sm',
              borderBottomLeftRadius: 'sm',
              backgroundColor: 'primary.500',
              opacity: selectedCategory === category ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          />
           </>
        ))}
         
      </Stack>
        
        <Box  borderLeft={isMobileScreen ? "0" : '1px solid #eee'}  h={isMobileScreen ? "auto" : '550px'} overflowX="scroll" pt="100px" ml={isMobileScreen ? 0 : '200px'} p={4} flexGrow={1}>
          <Flex pt={isMobileScreen ? "100px" : '0px'}>
            <Text w="100%" textTransform="capitalize" fontWeight="bold">
              {selectedCategory || 'All'}
            </Text>
            <Spacer />
            <Select
              options={SortingOptions}
              value={SortingOptions.find((option) => option.value === selectedSortOption)}
              onChange={(selectedOption) => setSelectedSortOption(selectedOption.value)}
              placeholder="Sort By:"
              styles={customStylesReactSelect}
            />
          </Flex>

          {filteredSortedSelectedCategoryContent ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg:4 }} spacing={4} mt={4}>
              {filteredSortedSelectedCategoryContent?.map((product, index) => (
                <Card
                  cursor="pointer"
                  key={product.id}
                  boxShadow="md"
                  onClick={() => handleCardClick(product.id)}
                  ref={index === memoizedSelectedCategoryContent.length - 1 ? lastCardRef : null}
                >
                  <CardHeader display="flex" justifyContent="center">
                    <Box as="img" src={product.image} alt={product.title} maxW="150px" maxH="100px" objectFit="cover" />
                  </CardHeader>
                  <CardBody>
                    <Text className="text-4xl" fontWeight="normal" fontSize="sm" mb={2}>
                      {product.title}
                    </Text>
                  </CardBody>
                  <CardFooter display="flex" justifyContent="space-between">
                    <Text fontWeight="semibold" color="gray.600">
                      &#8377;{product.price}
                    </Text>
                    <CustomAddButton item={product}  onAddToCart={handleAddToCart} />
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
            
          ) : (
            <Text>No content to display for the selected category.</Text>
          )}
          
          {loadingMore && (
            <Box textAlign="center" my={4}>
              <Spinner size="lg" />
            </Box>
          )}
        </Box>
        
      </Box>

     ):(
      <Box h="100vh" display="flex" justifyContent="center" alignItems="center" fontSize="xl" fontWeight="bold" textAlign="center">Please Login</Box>
     )
}     
    </>
  );
};

export default AllCategory;
