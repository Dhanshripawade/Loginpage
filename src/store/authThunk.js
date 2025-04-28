import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// Login Thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/admin/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Register Thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/admin/register', formData);
      return response.data;
    } catch (err) {
     
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);



