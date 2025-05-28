import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";


// Login Thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ BASE_URL}/admin/login`, credentials);
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
      const response = await axios.post(`${ BASE_URL}/admin/register`, formData);
      return response.data;
    } catch (err) {
     
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);


//get consultant  Data
export  const getConsltantData = createAsyncThunk("auth/getConsltantData",async (_,{rejectWithValue})=>{
  try{
    const user = JSON.parse(localStorage.getItem('currentUser'));  
    const token = user?.token;

  console.log("token for getdata:",token);
  
    const response = await axios.get(`${ BASE_URL}/admin/getallconsultant`, {
      headers: {
        Authorization : token
      }
    });
    return response.data.data;
  }catch(err){
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
})

//edit/update consultant
export const updateDoctor = createAsyncThunk(
  "auth/updateDoctor",
  async ({ id, updatedData }, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.patch(`${ BASE_URL}/admin/updateconsultant/${id}`, updatedData, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);
//view Doctor
export const viewDoctor = createAsyncThunk(
  "auth/viewDoctor",
  async (cIN, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.get(`${ BASE_URL}/admin/consutantbyid/${cIN}`, {
        headers: {
          Authorization: token,
        },
      });

      console.log("API Response:", response.data.data);
      return response.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Get data by ID failed");
    }
  }
);


// Delete Doctor Thunk
export const deleteDoctor = createAsyncThunk(
  "auth/deleteDoctor",
  async (doctorId, { rejectWithValue }) => {
    const adminToken = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      const response = await axios.delete(`${ BASE_URL}/admin/deleteConsultant/${doctorId}`, {
        headers: {
          Authorization: adminToken
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);





//getreceptionist
export const getallreception=createAsyncThunk("auth/getallreception",async(_,{rejectWithValue})=>{
  try{
    const user = JSON.parse(localStorage.getItem('currentUser'));  
    const token = user?.token;

    const response =await axios.get(`${ BASE_URL}/admin/allreceptionist`,{
           headers:{
            Authorization:token
           }
    })
    console.log(response.data.data);
    
    return response.data.data
  }catch(err){
    return rejectWithValue(err.response?.data?.message || "Failed to get data")
  }
})

 //create reception list
 export const registerReception =createAsyncThunk("auth/registerReception",async(formData,{rejectWithValue})=>{
  try{
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token=user?.token;
    const response=await axios.post(`${ BASE_URL}/admin/registerreceptionist`,formData,{
      headers:{
        Authorization:token
      }
    });
    console.log(response.data.data);
    return response.data,data;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');

  }
})

//delete receptionsits
export const deleteReception = createAsyncThunk(
  "auth/deleteReception",
  async (_id, { rejectWithValue }) => {
    const adminToken = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      const response = await axios.delete(`${ BASE_URL}/admin/deletereceptionist/${_id}`, {
        headers: {
          Authorization: adminToken
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

//view receptionsists
export const viewReception = createAsyncThunk("auth/viewReception", async (rID, thunkAPI) => {
  try {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    const response = await axios.get(`${ BASE_URL}/admin/receptionistbyid/${rID}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Get data by ID failed");
  }
});

//updateReception
export const updateReception = createAsyncThunk(
  "auth/updateReception",
  async ({ id, updatedData }, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.patch(`${ BASE_URL}/admin/updatereceptionist/${id}`, updatedData, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);


//Get All Patients
export const getallPatient = createAsyncThunk("auth/getallPatient",async(_,{rejectWithValue})=>{
  try{
    const user =JSON.parse(localStorage.getItem('currentUser'));
    const token =user?.token;
    
    const response =await axios.get(`${ BASE_URL}/admin/getallpatient`,{
                headers:{
                  Authorization:token
                }
    });
    // console.log("thunk data patient:",response.data.data);
    
    return response.data.data
  }catch(err){
           return rejectWithValue(err.response?.data?.message || "Failed to get data")
  }
})

// savepatient
export const savepatient =createAsyncThunk("auth/savepatient",async(formData,{rejectWithValue})=>{
  try{
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token=user?.token;
    const response=await axios.post(`${ BASE_URL}/admin/savepatient`,formData,{
      headers:{
        Authorization:token
      }
    });
    console.log(response.data.data);
    
    return response.data,data;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');

  }
})


//Delete Patients
export const deletePatient = createAsyncThunk(
  "auth/deletePatient",
  async (_id, { rejectWithValue }) => {
    const adminToken = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      const response = await axios.delete(`${ BASE_URL}/admin/deletepatient/${_id}`, {
        headers: {
          Authorization: adminToken
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

//Update Patients
export const updatePatients = createAsyncThunk(
  "auth/updatePatients",
  async ({ id, updatedData }, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.patch(`${ BASE_URL}/admin/updatepatient/${id}`, updatedData, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);


//view
export const viewPatient = createAsyncThunk(
  "auth/viewPatient",
  async (id, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.get(
        `${ BASE_URL}/admin/getbyid/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);

      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "get data by id failed"
      );
    }
  }
);



//get department
export const getallDepartment = createAsyncThunk("auth/getallDepartment",async(_,{rejectWithValue})=>{
  try{
    const user =JSON.parse(localStorage.getItem('currentUser'));
    const token =user?.token;
    
    const response =await axios.get(`${ BASE_URL}/admin/alldepartment`,{
                headers:{
                  Authorization:token
                }
    });
    console.log(response.data.data);
    
    return response.data.data
  }catch(err){
           return rejectWithValue(err.response?.data?.message || "Failed to get data")
  }
})


//create departments
export const registerDepartment =createAsyncThunk("auth/registerDepartment",async(formData,{rejectWithValue})=>{
  try{
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token=user?.token;
    const response=await axios.post(`${ BASE_URL}/admin/createdepartment`,formData,{
      headers:{
        Authorization:token
      }
    });
    console.log(response.data.data);
    
    return response.data,data;
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');

  }
})


//delete departments
export const deleteDepartment = createAsyncThunk(
  "auth/deleteDepartment",
  async (_id, { rejectWithValue }) => {
    const adminToken = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      const response = await axios.delete(`${ BASE_URL}/admin/deletedepartment/${_id}`, {
        headers: {
          Authorization: adminToken
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

//View department
export const viewDepartment = createAsyncThunk("auth/viewDepartment", async (dIN, {thunkAPI}) => {
  try {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    const response = await axios.get(`${ BASE_URL}/admin/departmentbyid/${dIN}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Get data by ID failed");
  }
});

//update departments
export const updateDepartment = createAsyncThunk("auth/updateDepartment"  , 
     async ({id , updatedData} , {rejectWithValue}) =>
     {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      try{
        const response = await axios.patch(`${ BASE_URL}/admin/updatedepartment/${id}`, updatedData ,{
          headers : {
            Authorization : token,
          },
        });
        console.log(response.data);
        return response.data;
      } catch(error) {
        return rejectWithValue(error.response?.data || "Update failed");
      }
     }

    );


