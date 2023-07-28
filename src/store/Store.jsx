import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../redux/categoriesSlice';
import selectedCategoryReducer from '../redux/selectedCategorySlice';
import productDetailsReducer from '../redux/productDetailsSlice';
import cartReducer from '../redux/cartSlice';
import authReducer from '../redux/authSlice';

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    selectedCategory: selectedCategoryReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
