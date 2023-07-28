import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productDetails: null,
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
  },
});

export const { setProductDetails } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
