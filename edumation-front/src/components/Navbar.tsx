import './Navbar.css'; // Importing the CSS file
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/logout">Logout</a>
        <a href="/dashboard">Dashboard</a>
      </div>
    </nav>
  );
};

export default Navbar;
