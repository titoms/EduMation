import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="xl:w-48 sm:w-18 bg-gray-800 text-white">
      <div className="flex flex-col py-4 px-4">
        <Link
          to="/dashboard/"
          className="transition-all p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">🏠</span>
          <span className="hidden md:inline">Dashboard</span>
        </Link>
        <Link
          to="/dashboard/profile"
          className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">👤</span>
          <span className="hidden md:inline">Profile</span>
        </Link>
        <Link
          to="/dashboard/schools"
          className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">🏫</span>
          <span className="hidden md:inline">Schools</span>
        </Link>
        <Link
          to="/dashboard/courses"
          className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">📚</span>
          <span className="hidden md:inline">Courses</span>
        </Link>
        <Link
          to="/dashboard/students"
          className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">👥</span>
          <span className="hidden md:inline">Students</span>
        </Link>
        <Link
          to="/dashboard/quizz"
          className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">❓</span>
          <span className="hidden md:inline">Quizz</span>
        </Link>
        <Link
          to="/dashboard/schedules"
          className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">🗓️</span>
          <span className="hidden md:inline">Schedules</span>
        </Link>
        <Link
          to="/dashboard/settings"
          className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">⚙️</span>
          <span className="hidden md:inline">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
