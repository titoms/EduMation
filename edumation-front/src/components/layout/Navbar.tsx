import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  // Check if the user is logged in by verifying the presence of the token
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  // Search bar handling
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
  };

  const handleLogout = () => {
    // Clear the token from localStorage and any other state or context
    localStorage.removeItem('token');
    // Redirect or update state as necessary
    navigate('/');
  };

  return (
    <nav className="bg-navy text-white flex justify-between p-2 center">
      <Link to="/">
        <img src={logo} className="h-10" alt="Logo" />
      </Link>
      <div className="flex align-middle justify-center">
        <form
          onSubmit={handleSearchSubmit}
          className="relative w-full max-w-xs"
        >
          <input
            type="search"
            className="h-10 pl-10 pr-2 mr-2 bg-transparent border-2 border-gray-300 rounded-full text-sm text-white focus:outline-none focus:border-blue-500 hover:border-blue-500 active:border-blue-500"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="absolute left-0 top-0 mt-2 ml-3">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="text-white m-2 no-underline transition-colors hover:text-terciary"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="text-white m-2 no-underline transition-colors hover:text-terciary"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white m-2 no-underline transition-colors hover:text-terciary"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white m-2 no-underline transition-colors hover:text-terciary"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
