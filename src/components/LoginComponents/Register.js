import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    credits: 100,
    chat_details: null,
    number : NaN,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/ITT/register', formData)
      .then((response) => {
        setMessage(response.data);
      })
      .catch(() => {
        setMessage('Registration failed. Please try again.');
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-500 to-green-300">
      <h1 className="mb-8 text-5xl font-extrabold text-white font-mono animate-pulse">
        Create an Account
      </h1>

      {/* Main Container with the same width as Login Page */}
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-xl border border-green-100">
        <h2 className="text-4xl font-bold font-mono text-center text-gray-700">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-green-400 focus:border-green-500 transition duration-300 ease-in-out"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-green-400 focus:border-green-500 transition duration-300 ease-in-out"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-green-400 focus:border-green-500 transition duration-300 ease-in-out"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Number:</label>
            <input
              type="number"
              name="name"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-green-400 focus:border-green-500 transition duration-300 ease-in-out"
              placeholder="Enter your number"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-400 transition duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-red-600 font-semibold">{message}</p>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-800 transition duration-200">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
