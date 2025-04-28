import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authThunk';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images(1).png'; 

const Home = () => {
  const [username, setUsername] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        const decoded = jwtDecode(user);
        if (decoded?.username) {
          setUsername(decoded.username);
        }
      } catch (err) {
        console.error('Invalid token');
      }
    }
  }, []);

  useEffect(() => {
    dispatch(registerUser());
  }, [dispatch]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="relative flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-[100vh] w-60 bg-black z-30 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
      >
        <div className="p-4">
          <img src={logo} alt="Logo" className="w-3/5 mx-auto my-6 rounded shadow" />
          <nav className="flex flex-col items-center mt-6 space-y-4">
            <SidebarLink to="/home" label="Home" onClick={closeSidebar} />
            <SidebarLink to="#" label="Admin" onClick={closeSidebar} />
            <SidebarLink to="/doctor/register" label="Consultant" onClick={closeSidebar} />
            <SidebarLink to="#" label="Doctor" onClick={closeSidebar} />
            <SidebarLink to="#" label="Patient" onClick={closeSidebar} />
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <header className="flex items-center justify-between px-4 py-3 text-white bg-black md:pl-72">
          <button className="text-white md:hidden" onClick={toggleSidebar}>
            {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <ul className="hidden space-x-20 text-lg md:flex">
            <li className="cursor-pointer hover:text-blue-300">Home</li>
            <li className="cursor-pointer hover:text-blue-300">About</li>
            <li className="cursor-pointer hover:text-blue-300">Contact</li>
            <li className="cursor-pointer hover:text-blue-300">Logout</li>
          </ul>
        </header>

        {/* Page Content */}
        <main className="p-4 mt-4 md:ml-64">
          <h1 className="mb-4 text-3xl font-bold text-blue-700">Home</h1>
          <p className="mb-2 text-lg">Welcome to the home page!</p>
          <p className="text-gray-800 text-md">
            Username: <span className="font-semibold">{username}</span>
          </p>
        </main>
      </div>
    </div>
  );
};

// Updated SidebarLink
const SidebarLink = ({ to, label, onClick }) => (
  <Link to={to} className="w-11/12" onClick={onClick}>
    <button className="w-full px-4 py-2 text-lg text-white transition shadow rounded-xl hover:bg-blue-400 hover:shadow-lg">
      {label}
    </button>
  </Link>
);

export default Home;
