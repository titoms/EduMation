import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // Check if the user is logged in by verifying the presence of the token
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

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
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-white m-2 no-underline transition-colors hover:text-terciary"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-white m-2 no-underline transition-colors hover:text-terciary"
          >
            Login
          </Link>
        )}
        <Link
          to="/dashboard"
          className="text-white m-2 no-underline transition-colors hover:text-terciary"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
