import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
