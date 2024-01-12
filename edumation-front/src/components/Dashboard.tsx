import Sidebar from './SideBar';
import { Routes, Route } from 'react-router-dom';
import MainDashboard from './dashboard/MainDashboard';
import Profile from './dashboard/Profile';
import Users from './dashboard/Users';
import Schools from './dashboard/Schools';
import Courses from './dashboard/Courses';
import Students from './dashboard/Students';
import Schedules from './dashboard/Schedules';
import Quizz from './dashboard/Quizz';
import Settings from './dashboard/Settings';

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4">
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
      </div>
    </div>
  );
};

export default Dashboard;
