import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import './styles/styles.scss';
import { setLoginStatus } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const CustomBreadcrumb = () => {
  const location = useLocation();
  const history = useHistory();
  const isMobileScreen = useBreakpointValue({ base: true, md: true, lg:true,xl:false });
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  const getBreadcrumbItems = () => {
    const pathnames = location.pathname.split('/').filter((pathname) => pathname);
    const breadcrumbItems = [];

    breadcrumbItems.push({
      label: 'All',
      url: '/category/All',
    });

    // Check if the last element is a numeric value (product ID), if so, remove it
    const lastPathname = pathnames[pathnames.length - 1];
    if (!isNaN(lastPathname)) {
      pathnames.pop();
    }

    pathnames.forEach((pathname, index) => {
      const url = `/${pathnames.slice(0, index + 1).join('/')}`;
      breadcrumbItems.push({
        label: pathname,
        url,
      });
    });

    return breadcrumbItems;
  };

  const breadcrumbItems = getBreadcrumbItems();

  const handleBreadcrumbClick = (url) => {
    history.push(url);
  };

  const getClassNames = (pathname) => {
    if (pathname.startsWith('/category/')) {
      return 'categoryBreadcrumb';
    } else if (pathname.startsWith('/product/')) {
      return 'productBreadcrumb';
    }
    return '';
  };

  return (
    <>
    {
      isLoggedIn ? (
        <Breadcrumb top={isMobileScreen?"110px":"80px"} color="#FFFFFF" className={getClassNames(location.pathname)} w="100%" spacing="8px" fontSize="sm" separator=">">
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index === breadcrumbItems.length - 1 ? (
              <BreadcrumbLink
              fontSize={isMobileScreen?"12px":"sm"}
                as={Link}
                to={item.url}
                fontWeight="700"
                textTransform="uppercase"
                onClick={() => handleBreadcrumbClick(item.url)}
              >
                {item.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink
              fontSize={isMobileScreen?"12px":"sm"}
                as={Link}
                to={item.url}
                textTransform="uppercase"
                onClick={() => handleBreadcrumbClick(item.url)}
              >
                {item.label}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      ):null
    }
  </>
  );
};

export default CustomBreadcrumb;
