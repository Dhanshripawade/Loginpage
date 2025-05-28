import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

// Register 
export const registerDoctor = createAsyncThunk(
  "auth/registerDoctor",
  async (formData, thunkAPI) => {
    const adminToken = localStorage.getItem("currentUser");
    // console.log("currrr:",adminToken);
    
    try {
      const response = await axios.post(
        `${ BASE_URL}/doctor/register`,
        formData,
        {
            headers:{
                Authorization:adminToken,
            }
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Login 
export  const LoginDoctor = createAsyncThunk("auth/LoginDoctor",async(formData,{rejectWithValue})=>{
    try{
      const response =await axios.post(`${ BASE_URL}/doctor/login`,formData);
      return response.data
    }catch(err){
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
})