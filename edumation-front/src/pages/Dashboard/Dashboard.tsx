import SideBar from './components/SideBar';
import { Routes, Route } from 'react-router-dom';
import MainDashboard from './components/MainDashboard';
import Profile from './components/Profile';
import Users from './components/Users';
import Schools from './components/Schools';
import Courses from './components/Courses';
import Students from './components/Students';
import Schedules from './components/Schedules';
import Quizz from './components/Quizz';
import Settings from './components/Settings';
import { DashboardContext } from '../../context/DashboardContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(response.data);
      } catch (error) {
        toast.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex bg-gray-100">
      <SideBar />
      <div className="flex-grow w-full p-4">
        <DashboardContext.Provider value={users}>
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<Users />} />
            <Route path="schools" element={<Schools />} />
            <Route path="courses" element={<Courses />} />
            <Route path="students" element={<Students />} />
            <Route path="schedules" element={<Schedules />} />
            <Route path="quizz" element={<Quizz />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </DashboardContext.Provider>
      </div>
    </div>
  );
};

export default Dashboard;