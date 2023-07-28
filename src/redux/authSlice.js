// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setLoginStatus: (state, action) => {
        state.isLoggedIn = action.payload;
      },
  },
});

export const { setToken, clearToken,setLoginStatus } = authSlice.actions;
export default authSlice.reducer;
