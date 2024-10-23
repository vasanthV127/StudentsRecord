import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('username', credentials.username);
      params.append('password', credentials.password);

      const response = await axios.post('http://localhost:8080/ITT/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 200 && response.data.status) {
        navigate('/home');
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-blue-400">
      <h1 className="mb-8 text-5xl font-extrabold text-white font-mono  animate-bounce">
        Welcome to Intrain Tech
      </h1>

      <div className="w-full max-w-lg p-10 space-y-10 bg-white shadow-2xl rounded-xl border border-blue-100">
        <h2 className="text-4xl font-semibold font-mono text-center text-gray-700">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-500 focus:outline-none focus:ring focus:ring-blue-400 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-red-600 font-semibold transition duration-300 ease-in-out">
            {message}
          </p>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-800 transition duration-200">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
