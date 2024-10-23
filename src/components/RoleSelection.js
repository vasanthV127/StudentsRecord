import React, { useState } from "react";
import "./RoleSelection.css";

const jobRoles = [
  "Software Engineer",
  "AI Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Data Engineer",
  "Data Analyst",
  "Full Stack Developer",
];

const experienceLevels = [
  "Internship",
  "Entry-Level",
  "Mid-Level",
  "Senior-Level",
  "Lead",
];

const RoleSelection = ({ onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  const handleRoleSelect = () => {
    if (selectedRole && selectedExperience) {
      onSelectRole(selectedRole, selectedExperience);
    }
  };

  return (
    <div className="flex justify-center  items-center mt-24 ml-72">
      <div
        id="main"
        className="bg-white w-full max-w-md rounded-3xl shadow-md p-6 border border-blue-900 grid items-center  "
      >
        <h1 className="text-xl font-mono text-center text-blue-900 mb-8 ">
          Select Your Preferred Job Role
        </h1>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border border-blue-600 text-center  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 mx-auto   mb-4 transform transition-transform hover:scale-110"
        >
          <option value=""> -- Select a role --  </option>
          {jobRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
        
        <h2 className="text-xl font-mono text-center text-blue-900 mb-6">Select Your Experience Level</h2>
        <select
          value={selectedExperience}
          onChange={(e) => setSelectedExperience(e.target.value)}
          className="border border-blue-600 text-center rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 mx-auto  mb-6 transform transition-transform hover:scale-110"
        >
          <option value=""> -- Select experience -- </option>
          {experienceLevels.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>
        
        <button
          onClick={handleRoleSelect}
          className="bg-blue-700 text-white rounded-xl p-2 hover:bg-blue-800 transition duration-200 w-28 mx-auto"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
