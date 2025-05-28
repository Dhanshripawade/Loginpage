import React from 'react';
import Home from './Sidebar';
import {
  FaCalendarCheck,
  FaUsers,
  FaBuilding,
  FaUserNurse
} from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', current: 40, previous: 30 },
  { month: 'Feb', current: 60, previous: 45 },
  { month: 'Mar', current: 70, previous: 50 },
  { month: 'Apr', current: 75, previous: 55 },
  { month: 'May', current: 85, previous: 65 },
  { month: 'Jun', current: 95, previous: 70 },
  { month: 'Jul', current: 70, previous: 60 },
  { month: 'Aug', current: 80, previous: 63 },
  { month: 'Sep', current: 88, previous: 67 },
  { month: 'Oct', current: 92, previous: 72 },
  { month: 'Nov', current: 97, previous: 78 },
  { month: 'Dec', current: 100, previous: 82 },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Home />

      <div className="flex-1 p-4">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 ">Doctor's Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<FaCalendarCheck className="text-2xl text-cyan-600" />}
            title="Today's Visits"
            count="12"
            subtitle="Thu Jun 17"
            change="+1.29%"
            changeColor="text-red-600"
          />
          <StatCard
            icon={<FaUsers className="text-2xl text-sky-600" />}
            title="Patients"
            count="287"
            subtitle="Last 7 days"
            change="+1.29%"
            changeColor="text-red-600"
          />
          <StatCard
            icon={<FaBuilding className="text-2xl text-indigo-600" />}
            title="Departments"
            count="82"
            subtitle="Last 7 days"
            change="-25%"
            changeColor="text-red-600"
          />
          <StatCard
            icon={<FaUserNurse className="text-2xl text-indigo-600" />}
            title="Receptionsits"
            count="22"
            subtitle="Last 7 days"
            change="+2.42%"
            changeColor="text-red-600"
          />
        </div>

        {/* Chart */}
        <div className="p-6 mb-8 bg-white shadow rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Visit Statistics</h2>
            <button className="px-3 py-1 text-sm text-gray-600 border rounded hover:bg-gray-100">
              Filters
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="current" stroke="#0ea5e9" name="Current year" />
              <Line type="monotone" dataKey="previous" stroke="#a5b4fc" name="Previous year" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Appointments */}
        {/* <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Appointments</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4 text-sm font-medium text-blue-600">
              <button className="underline">Today's visits</button>
              <button className="text-gray-500 hover:text-blue-600">Upcoming visits</button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-1 text-sm border rounded focus:outline-none"
              />
              <button className="px-3 py-1 text-sm text-gray-600 border rounded hover:bg-gray-100">
                Filters
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="patient"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-800">Sophia Khan</p>
                <p className="text-sm text-gray-500">Online consultation</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">Wed Jun 16 • 4:00PM</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, count, subtitle, change, changeColor }) => (
  <div className="flex items-start gap-4 p-4 transition duration-300 transform shadow-lg bg-gradient-to-r from-green-500 to-blue-800 rounded-xl hover:shadow-2xl hover:scale-105">
    <div className="p-3 text-white bg-white rounded-full">{icon}</div>
    <div className="flex flex-col text-white">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold">{count}</p>
      <div className="flex items-center gap-2 mt-2 text-xs">
        <span className={`${changeColor} font-semibold`}>{change}</span>
        <span className="text-white opacity-80">{subtitle}</span>
      </div>
    </div>
  </div>
);


export default Dashboard;
