import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        {
          email,
          password,
        }
      );
      // Handle login success, store the received token, redirect, etc.
      localStorage.setItem('token', response.data);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data);
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="items-center h-screen bg-gray-100 p-6">
        <img src={logo} className="h-40 m-auto" alt="Logo" />
        <div className="flex justify-center mt-8">
          <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold text-gray-700 text-center">
              Login
            </h2>
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
            <form onSubmit={handleLogin} className="mt-4">
              <div>
                <label className="block" htmlFor="loginEmail">
                  Email:
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  name="loginEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="loginPassword">
                  Password:
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  name="loginPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;