import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DragAndDrop from './DragAndDrop';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileDrop = (file: File) => {
    setProfileImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('role', formData.role);
    if (profileImage) {
      formDataToSend.append('profileImage', profileImage);
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/register',
        formDataToSend
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
              <label htmlFor="name" className="block">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block">Profile Picture:</label>
              <DragAndDrop onFileDrop={handleFileDrop} />
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
