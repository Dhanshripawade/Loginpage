import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../store/authThunk';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Both fields are required');
      return;
    }

    try {
      const user = await dispatch(loginUser({ username, password })).unwrap();
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log(user);
      
      setusername('');
      setPassword('');
      navigate('/home');
    } catch (err) {
      setMessage(typeof err === 'string' ? err : 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {(error || message) && (
          <p className="text-sm text-center text-red-500">
            {error || message}
          </p>
        )}
        
          <div>
          <label htmlFor="password" className="block mb-1">Username:</label>

        <input
          type="username"
          placeholder="username"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password:</label>
        
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-sm text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
