import SideBar from '../../components/ui/SideBar';
import MainDashboard from './components/MainDashboard';
import Profile from './components/Profile';
import Users from './components/Users';
import Schools from './components/Schools';
import Courses from './components/Courses';
import Students from './components/Students';
import Schedules from './components/Schedules';
import Quizz from './components/Quizz';
import Settings from './components/Settings';
import Classes from './components/Classes';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import IndividualClass from './components/classes/IndividualClass';
import QuizzCreation from './components/quizz/QuizzCreation';
import SchoolCreation from './components/school/SchoolCreation';
import ClassCreation from './components/classes/ClassCreation';
import CourseCreation from './components/courses/CourseCreation';
import ScheduleCreation from './components/schedule/ScheduleCreation';
import ClassImport from './components/classes/ClassImport';

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 overflow-hidden">
      <SideBar />
      <div className="flex-grow w-full overflow-auto h-screen p-4">
        <UserProvider>
          <Routes>
            <Route index element={<MainDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />

            <Route path="users" element={<Users />} />
            <Route path="students" element={<Students />} />

            <Route path="schools" element={<Schools />} />
            <Route path="schools/new" element={<SchoolCreation />} />

            <Route path="classes" element={<Classes />} />
            <Route path="classes/new" element={<ClassCreation />} />
            <Route path="classes/import" element={<ClassImport />} />
            <Route path="classes/:id" element={<IndividualClass />} />

            <Route path="courses" element={<Courses />} />
            <Route path="courses/new" element={<CourseCreation />} />

            <Route path="schedules" element={<Schedules />} />
            <Route path="schedules/new" element={<ScheduleCreation />} />

            <Route path="quizz" element={<Quizz />} />
            <Route path="quizz/new" element={<QuizzCreation />} />
          </Routes>
        </UserProvider>
      </div>
    </div>
  );
};

export default Dashboard;
