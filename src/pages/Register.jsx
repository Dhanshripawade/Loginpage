import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hin: '',
    name: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setGeneralError('');
  };

  const validateForm = () => {
    const newErrors = {};
    const { hin, name, username, email, password, phoneNumber, address } = formData;

    if (!hin) newErrors.hin = 'HIN is required';
    if (!name) newErrors.name = 'Name is required';
    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!address) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.find((user) => user.email === formData.email);

    if (userExists) {
      setGeneralError('User already exists, please login.');
      return;
    }

    const newUser = { ...formData };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    setFormData({
      hin: '',
      name: '',
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: '',
    });
    setErrors({});
    setGeneralError('');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        {generalError && <p className="text-sm text-center text-red-500">{generalError}</p>}
        <div>
          <label htmlFor="hin" className="block mb-1">HIN:</label>
          <input
            id="hin"
            name="hin"
            type="text"
            placeholder="Enter your HIN"
            className={`w-full p-2 border rounded ${errors.hin ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.hin}
            onChange={handleChange}
          />
          {errors.hin && <p className="text-xs text-red-500">{errors.hin}</p>}
        </div>

         <div>
          <label htmlFor="username" className="block mb-1">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            className={`w-full p-2 border rounded ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
        </div>

       <div>
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block mb-1">Phone Number:</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            className={`w-full p-2 border rounded ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block mb-1">Address:</label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Enter your address"
            className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 font-medium text-white bg-green-500 rounded hover:bg-green-600"
        >
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link to="/" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
