import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerDoctor } from '../store/consultant/consultantThunk';

function ConsultantRegister() {
  const [formData, setFormData] = useState({
        cIN: "",
        name: "",
        gender: "",
        email:"",
        dateOfBirth: "",
        specialization: "",
        specialty:"",
        qualifications: "",
        medicalLicenseNumber: "",
        phoneNumber: "",
        yearsOfExperience: "",
        username: "",
        password: "",
      });
    console.log("Fromdata:",formData);
    
  
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(registerDoctor(formData)).unwrap();
      console.log("Registration successful:",response);
      
    } catch (error) {
      console.error("Error:", error);
    }
  };




return (
  <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
  <form
    onSubmit={handlesubmit}
    className="p-6 space-y-4 bg-white rounded shadow-md"
  >
    <h1 className="text-2xl font-semibold text-center">Doctor Registration</h1>

    <div className="p-5 pt-0">
      
      <div className="m-3">
        <label htmlFor="cIN" className="block mb-1 font-medium">Consultant Number:</label>
        <input
          type="text"
          name="cIN"
          id="cIN"
          placeholder="Consultant Number"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.cIN}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Name */}
      <div className="m-3">
        <label htmlFor="name" className="block mb-1 font-medium">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          autoComplete="name"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Gender */}
      <div className="m-3">
        <label htmlFor="gender" className="block mb-1 font-medium">Gender:</label>
        <input
          type="text"
          name="gender"
          id="gender"
          placeholder="Gender"
          autoComplete="sex"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Date of Birth */}
      <div className="m-3">
        <label htmlFor="dateOfBirth" className="block mb-1 font-medium">Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          placeholder="Date of Birth"
          autoComplete="bday"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Specialization */}
      <div className="m-3">
        <label htmlFor="specialization" className="block mb-1 font-medium">Specialization:</label>
        <input
          type="text"
          name="specialization"
          id="specialization"
          placeholder="Specialization"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.specialization}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Qualification */}
      <div className="m-3">
        <label htmlFor="qualifications" className="block mb-1 font-medium">Qualification:</label>
        <input
          type="text"
          name="qualifications"
          id="qualifications"
          placeholder="Qualification"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.qualifications}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Medical License Number */}
      <div className="m-3">
        <label htmlFor="medicalLicenseNumber" className="block mb-1 font-medium">Medical License Number:</label>
        <input
          type="text"
          name="medicalLicenseNumber"
          id="medicalLicenseNumber"
          placeholder="Medical License Number"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.medicalLicenseNumber}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Phone Number */}
      <div className="m-3">
        <label htmlFor="phoneNumber" className="block mb-1 font-medium">Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Phone Number"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Years of Experience */}
      <div className="m-3">
        <label htmlFor="yearsOfExperience" className="block mb-1 font-medium">Years of Experience:</label>
        <input
          type="number"
          name="yearsOfExperience"
          id="yearsOfExperience"
          placeholder="Years of Experience"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.yearsOfExperience}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Username */}
      <div className="m-3">
        <label htmlFor="username" className="block mb-1 font-medium">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          autoComplete="username"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Password */}
      <div className="m-3">
        <label htmlFor="password" className="block mb-1 font-medium">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          autoComplete="new-password"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Specialty */}
      <div className="m-3">
        <label htmlFor="specialty" className="block mb-1 font-medium">Specialty:</label>
        <input
          type="text"
          name="specialty"
          id="specialty"
          placeholder="Specialty"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.specialty}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Email */}
      <div className="m-3">
        <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="email"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 mt-4 font-medium text-white bg-green-500 rounded hover:bg-green-600"
      >
        Register
      </button>

      {/* Link to Login */}
      <p className="mt-4 text-sm text-center">
        Already have an account?{' '}
        <Link to="/doctor/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  </form>
</div>

  );
}

export default ConsultantRegister;
