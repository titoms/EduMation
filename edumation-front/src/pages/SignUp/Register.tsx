import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UsersService from '../../services/UsersService';
import { User } from '../../services/Types';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // const newUser: User = {
      //   // Assuming these are the fields in your User type
      //   name: 'John Doe',
      //   email: 'johndoe@example.com',
      //   password: 'password123',
      //   profileImage: '',
      //   role: 'user',
      //   // Add other fields as required
      // };
      // const response = await UsersService.createUser(newUser);

      const response = await axios.post(
        'http://localhost:5000/api/users/register',
        formData
      );
      toast.success('Registration successful');
      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data);
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="items-center h-screen bg-gray-100 p-6">
      <img src={logo} className="h-40 m-auto" alt="Logo" />
      <div className="flex justify-center mt-8">
        <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold text-gray-700 text-center">
            Register
          </h2>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit} className="mt-4">
            <div>
              <label htmlFor="nameRegister" className="block">
                Name:
              </label>
              <input
                type="text"
                id="nameRegister"
                name="nameRegister"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="emailRegister" className="block">
                Email:
              </label>
              <input
                type="email"
                id="emailRegister"
                name="emailRegister"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="passwordRegister" className="block">
                Password:
              </label>
              <input
                type="password"
                id="passwordRegister"
                name="passwordRegister"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
