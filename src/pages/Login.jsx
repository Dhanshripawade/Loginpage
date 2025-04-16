
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage({ type: 'error', text: 'Both fields are required' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      setMessage({ type: 'success', text: `Login successful! Welcome, ${user.name}` });
   
      localStorage.setItem('currentUser', JSON.stringify(user));
    
      setEmail('');
      setPassword('');
    
      navigate('/home');
    } else {
      setMessage({ type: 'error', text: 'Invalid email or password' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        {message.text && (
          <p className={message.type === 'error'
              ? 'text-red-500 text-sm text-center'
              : 'text-green-500 text-sm text-center'}>
            {message.text}
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Login
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
