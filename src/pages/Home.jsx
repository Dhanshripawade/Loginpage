// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();

  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {currentUser ? (
        <>
          <h1 className="mb-4 text-3xl font-bold">Welcome, {currentUser.name}!</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <h1 className="mb-4 text-3xl font-bold">Welcome, Guest!</h1>
      )}
    </div>
  );
}

export default Home;
