import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/authThunk";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  FaBell, FaCog, FaQuestionCircle, FaSearch, FaUserCircle,FaDatabase,
  FaChevronLeft, FaChevronRight, FaUserMd, FaUserNurse, FaUsers, FaBuilding
} from "react-icons/fa";

const Home = () => {
  const [username, setUsername] = useState("currentUser");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      try {
        const decoded = jwtDecode(user);
        if (decoded?.username) {
          setUsername(decoded.username);
        }
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  useEffect(() => {
    dispatch(registerUser());
  }, [dispatch]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <div className="relative flex min-h-screen text-black bg-gray-100">
      {/* Sidebar */}
      <div
  className={`fixed top-0 left-0 h-[100vh] ${collapsed ? "w-20" : "w-64"} 
  bg-[#202531]  text-white z-30 transform transition-all duration-300 ease-in-out
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
>

        <div className="flex flex-col justify-between h-full px-2 py-4">
        
          <div>
            <div className="flex items-center justify-between px-2 mb-4">
              {!collapsed && <h2 className="ml-2 text-xl font-extrabold">Doctor.app</h2>}
              <button onClick={toggleCollapse} className="text-white">
                {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
              </button>
            </div>

          
            {/* {!collapsed && (
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full py-2 pl-10 pr-4 text-sm bg-[#2E2F65] text-white rounded-lg placeholder:text-gray-300 focus:outline-none"
                />
                <FaSearch className="absolute text-gray-400 left-3 top-3" />
              </div>
            )} */}

            {/* Links */}
            <nav className="mt-5">
              <SidebarLink to="/dashboard"  label="Dashboard" Icon={FaDatabase}  collapsed={collapsed} onClick={closeSidebar} />

              <SidebarLink to="/consultant"  label="Consultant" Icon={FaUserMd}  collapsed={collapsed} onClick={closeSidebar} />
              <SidebarLink to="/receptionists" label="Receptionists" Icon={FaUserNurse} collapsed={collapsed} onClick={closeSidebar} />
              <SidebarLink to="/patient" label="Patients" Icon={FaUsers}  collapsed={collapsed} onClick={closeSidebar} />
              <SidebarLink to="/department" label="Departments" Icon={FaBuilding} collapsed={collapsed} onClick={closeSidebar} />


               <div className="mt-48">
                              <hr className="my-4 border-gray-600" />
              <SidebarLink  label="Notifications" Icon={FaBell} activePath={location.pathname} collapsed={collapsed} />
              <SidebarLink label="Settings" Icon={FaCog} activePath={location.pathname} collapsed={collapsed} />
              <SidebarLink label="Help" Icon={FaQuestionCircle} activePath={location.pathname} collapsed={collapsed} />
              </div>
            </nav>
          </div>

          
          <div className="flex items-center justify-between px-2 pt-4 border-t border-gray-600">
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-3xl" />
              {!collapsed && (
                <div>
                  <p className="text-sm font-medium">{username}</p>
                  <p className="text-xs text-gray-400">pawade@gmail.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      
   {sidebarOpen && (
  <div
    className="fixed inset-0 z-20 md:hidden"
    onClick={closeSidebar}
  />
)}



      
      <div className="flex flex-col flex-1">
        <button className="p-4 text-black md:hidden" onClick={toggleSidebar}>
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        
      </div>
    </div>
  );
};

const SidebarLink = ({ to, label, Icon, activePath, collapsed }) => {
  const isActive = activePath === to;

  return (
    <Link to={to}>
      <div
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
        ${isActive ? "bg-indigo-600" : "hover:bg-indigo-500"} 
        ${collapsed ? "justify-center" : ""}`}
      >
        <Icon className="text-lg" />
        {!collapsed && <span className="text-sm font-medium">{label}</span>}
      </div>
    </Link>
  );
};

export default Home;
