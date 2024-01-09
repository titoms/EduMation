import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-navy text-white flex justify-between p-2 center">
      <Link to="/">
        <img src={logo} className="h-10" alt="Logo" />
      </Link>
      <div className="flex align-middle justify-center">
        <Link
          to="login"
          className="text-white m-2 no-underline transition-colors hover:text-terciary"
        >
          Login
        </Link>
        <Link
          to="/logout"
          className="text-white m-2 no-underline transition-colors hover:text-terciary"
        >
          Logout
        </Link>
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
