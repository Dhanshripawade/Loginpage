import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../store/authThunk';
import image from "../assets/image.png";      
import image1 from "../assets/image1.png";    

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !role) {
      setMessage('All fields are required');
      return;
    }

    try {
      const user = await dispatch(loginUser({ username, password })).unwrap();
      localStorage.setItem('currentUser', JSON.stringify(user));
      setUsername('');
      setPassword('');
      navigate('/dashboard');
    } catch (err) {
      setMessage(typeof err === 'string' ? err : 'Login failed');
    }
  };

  const formatRole = (r) => r.charAt(0).toUpperCase() + r.slice(1);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="flex w-full max-w-3xl overflow-hidden bg-white shadow-lg rounded-xl">

      
        <div className="flex flex-col items-center justify-center w-1/2 p-6 bg-white">
          <img
            src={image}
            alt="Doctors"
            className="object-contain w-full mb-4 max-h-64"
          />
          
        </div>

    
        <div className="flex flex-col items-center justify-center w-1/2 p-8 md:p-12">
          <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
            Sign in to Doctor-APP
          </h2>

         

        
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-2/3 p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="consultant">Doctor</option>
            <option value="receptionist">Receptionist</option>
          </select>

          
          {role && (
            <>
              <div className="mb-4 text-sm font-semibold text-gray-600">
                Sign In as {formatRole(role)}
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-2/3 p-2 mb-3 border rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-2/3 p-2 mb-3 border rounded-lg"
              />
              <div className="w-2/3 mb-3 text-sm text-right">
                <Link to="/forgot-password" className="text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="w-2/3 py-2 font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-900"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            
            </>
          )}
            {!role && (
            <img
              src={image1}
              alt="Stethoscope"
              className="object-contain w-full mt-4 max-h-32"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
