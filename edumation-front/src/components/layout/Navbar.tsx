import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ThemeModeSwitcher from '../ui/ThemeModeSwitcher';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className=" text-white bg-navy dark:bg-slate-950 flex justify-between p-2 center">
      <Link to="/">
        <img src={logo} className="h-10 w-10" alt="Logo" />
      </Link>
      <div className="flex align-middle items-center gap-2 justify-center">
        <ThemeModeSwitcher />
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="m-2 no-underline transition-colors hover:text-blue-400"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="m-2 no-underline transition-colors hover:text-blue-400"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white m-2 no-underline transition-colors hover:text-blue-400"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white m-2 no-underline transition-colors hover:text-terciary"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
