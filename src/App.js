import React, {useState,useEffect} from 'react';
import { Box,Heading, Button} from '@chakra-ui/react';
import ProductDetails from './components/ProductDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllCategory from './components/AllCategory';
import Footer from './layout/Footer';
import Header from './layout/Header';
import CustomBreadcrumb from './components/BreadCrumb';
import LoginPage from './components/LoginPage';
import {useLocation } from 'react-router-dom';
import { setLoginStatus } from './redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  // Check if the user is logged in on page load
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    dispatch(setLoginStatus(storedLoginStatus));
  }, [dispatch]);
  const handleSearch = (query) => {
    setSearchQuery(query); 
  };
  const location = useLocation();
  // const isLoginPage = location.pathname === '/login';

  return (
    <>
     {isLoggedIn && <Header onSearch={handleSearch} />}
      {/* <Header onSearch={handleSearch} />  */}
      <Router>
        <CustomBreadcrumb />
        <Switch>
        <Route exact path="/login" component={LoginPage} />
          <Route exact path="/category/All">
            <AllCategory searchQuery={searchQuery} />
          </Route>
          <Route exact path="/category/:categoryName">
            <AllCategory searchQuery={searchQuery} />
          </Route>
          <Route path="/product/:productId/:productName" component={ProductDetails} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
};

export default App;

