import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authThunk';
import { jwtDecode } from 'jwt-decode'; 

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          state.token = token;
          state.user = decoded;
        } catch (err) {
          state.token = null;
          state.user = null;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        try {
          const decoded = jwtDecode(action.payload.token);
          state.user = decoded;
        } catch (err) {
          state.user = null;
        }
        localStorage.setItem('token', action.payload.token);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        // try {
        //   const decoded = jwtDecode(action.payload.token);
        //   state.user = decoded;
        // } catch (err) {
        //   state.user = null;
        // }
        localStorage.setItem('token', action.payload.token);
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
