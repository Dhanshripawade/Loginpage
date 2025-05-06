import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authThunk';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  FaTachometerAlt,
  FaUserMd,
  FaUserNurse,
  FaUsers,
  FaCalendarAlt,
  FaBuilding,
} from 'react-icons/fa';
// import logo from '../assets/images(1).png';

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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="relative flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-[100vh] w-60 bg-gray-900 z-30 text-white transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
      >
        <div className="p-4">
          {/* <img src={logo} alt="Logo" className="w-3/5 mx-auto my-6 rounded shadow" />
           */}
           <h1 className='items-center mx-4 mt-4 text-3xl font-extrabold'>Doctor App</h1>
          <nav className="flex flex-col items-start px-4 mt-6 space-y-4">
            <SidebarLink to="/dashboard" label="Dashboard" Icon={FaTachometerAlt} onClick={closeSidebar} />
            <SidebarLink to="/dashboard" label="Consultant" Icon={FaUserMd} onClick={closeSidebar} />
            <SidebarLink to="/receptionists" label="Receptionists" Icon={FaUserNurse} onClick={closeSidebar} />
            <SidebarLink to="/patient" label="Patients" Icon={FaUsers} onClick={closeSidebar} />
            <SidebarLink to="/appointment" label="Appointments" Icon={FaCalendarAlt} onClick={closeSidebar} />
            <SidebarLink to="/department" label="Departments" Icon={FaBuilding} onClick={closeSidebar} />
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
        <button className="p-4 text-black md:hidden" onClick={toggleSidebar}>
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {/* You can add the main content here */}
      </div>
    </div>
  );
};

const SidebarLink = ({ to, label, Icon, onClick }) => (
  <Link to={to} onClick={onClick} className="w-full">
    <button className="flex items-center w-full gap-3 px-4 py-2 text-lg text-white transition rounded-lg hover:bg-blue-600 hover:shadow">
      <Icon className="text-xl" />
      {label}
    </button>
  </Link>
);

export default Home;
