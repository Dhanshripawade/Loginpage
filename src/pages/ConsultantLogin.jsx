import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link, useNavigate } from 'react-router-dom';
import { LoginDoctor } from '../store/consultant/consultantThunk';
import toast from 'react-hot-toast';

function ConsultantLogin() {

 const navigate = useNavigate()
 const dispatch =useDispatch();
 const [formData,SetformData]=useState({
          username:"",
          password:""
   })
    
   const handlesubmit = async (e)=>{
    e.preventDefault();
      console.log("function called");

     try{
        const  DoctorUser =await dispatch(LoginDoctor(formData)).unwrap();
        localStorage.setItem("Doctoruser",JSON.stringify(DoctorUser));
        console.log("token:",DoctorUser);
        
         SetformData("");
        toast.success("doctor.... login successfully")
        setTimeout(()=>{
          navigate("/home")
        },[1000])
       
     }catch(err){
      console.log("error",err);
      }
}

 return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handlesubmit} className="p-6 space-y-4 bg-white rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold text-center">Consultant Login</h2>

        {/* {(error || message) && (
          <p className="text-sm text-center text-red-500">
            {error || message}
          </p>
        )} */}

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded"
        value={formData.username}
        onChange={(e)=>SetformData({...formData,[e.target.name]: e.target.value})}
        />
        <input
          type="password"
          name='password'
          placeholder="Password"
          className="w-full p-2 border rounded"
         value={formData.password}
         onChange={(e)=>SetformData({...formData,[e.target.name]:e.target.value})}
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        
        >
         Login
        </button>
        <p className="text-sm text-center">
          Don't have an account?{' '}
          <Link to="/doctor/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </form>
    
    </div>

  )
}

export default ConsultantLogin