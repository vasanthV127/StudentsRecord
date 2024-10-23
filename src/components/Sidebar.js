import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../images/logo.jpg';
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Define sidebar items and their corresponding paths
  const sidebarItems = [
    { icon: 'fas fa-file-alt', label: 'Resume Overview', path: '/resume' },
    { icon: 'fas fa-robot', label: 'Interview Test', path: '/test' }, 
    { icon: 'fas fa-headset', label: 'Interview Practice', path: '/practice' },
    { icon: 'fas fa-trophy', label: 'Success Story', path: '/success-story' },
  ];

  return (
    <aside className="w-64 fixed top-4 bottom-4 bg-gradient-to-b from-blue-950 to-blue-600 text-white p-5 rounded-r-3xl shadow-lg flex flex-col items-start font-mono ">
      <div className="flex items-center mb-10 mt-7">
        <img src={logo} alt="InTrain Tech Logo" className="w-12 h-12 rounded-lg mr-3 shadow-md" />
        <span className="ml-4 text-2xl font-bold tracking-wide">InTrain Tech</span>
      </div>

      <ul className="space-y-6 w-11/12 mt-6 mx-1">
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            onClick={() => navigate(item.path)}
            id='aside' 
            className="flex items-center space-x-4 hover:bg-blue-700 hover:shadow-lg p-2 rounded-lg transition ease-in duration-150 cursor-pointer"
          >
            <i className={item.icon}></i>
            <span className="font-medium">{item.label}</span>
          </li>
        ))}
      </ul>

      <button className="mt-auto mb-8 p-3 mx-1 py-2 bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center transition ease-in duration-150">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7 4a1 1 0 00-1 1v2a1 1 0 102 0V6h5v8H8v-1a1 1 0 10-2 0v2a1 1 0 001 1h6a1 1 0 001-1V5a1 1 0 00-1-1H7z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h9a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
