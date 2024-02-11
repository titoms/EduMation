import './index.css';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/SignUp/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Footer from './components/layout/Footer';
import ProtectedRoute from './utils/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContextProvider } from './context/ThemeContext';

function App() {
  return (
    <>
      <ThemeContextProvider>
        <BrowserRouter>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeContextProvider>
    </>
  );
}

export default App;
