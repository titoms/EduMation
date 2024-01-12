import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const SideBar = () => {
  const token = localStorage.getItem('token');
  let userRole = '';

  if (token) {
    const decodedToken: { role: string } = jwtDecode(token);
    userRole = decodedToken.role;
  }

  return (
    <div className="xl:w-48 sm:w-18 bg-gray-800 text-white">
      <div className="flex flex-col py-4 px-4">
        <Link
          to="/dashboard/"
          className="transition-all p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">🏠</span>
          <span className="hidden md:inline">Dashboard</span>
        </Link>

        {['admin', 'school', 'teacher', 'student'].includes(userRole) && (
          <Link
            to="/dashboard/profile"
            className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
          >
            <span className="text-lg mr-2">👤</span>
            <span className="hidden md:inline">Profile</span>
          </Link>
        )}

        {['admin'].includes(userRole) && (
          <Link
            to="/dashboard/users"
            className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
          >
            <span className="text-lg mr-2">👥</span>
            <span className="hidden md:inline">Users</span>
          </Link>
        )}

        {['admin', 'teacher'].includes(userRole) && (
          <Link
            to="/dashboard/schools"
            className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
          >
            <span className="text-lg mr-2">🏫</span>
            <span className="hidden md:inline">Schools</span>
          </Link>
        )}

        {['admin', 'school'].includes(userRole) && (
          <>
            <Link
              to="/dashboard/courses"
              className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
            >
              <span className="text-lg mr-2">📚</span>
              <span className="hidden md:inline">Courses</span>
            </Link>
            <Link
              to="/dashboard/students"
              className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
            >
              <span className="text-lg mr-2">👥</span>
              <span className="hidden md:inline">Students</span>
            </Link>
          </>
        )}

        {['admin', 'teacher'].includes(userRole) && (
          <Link
            to="/dashboard/quizz"
            className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
          >
            <span className="text-lg mr-2">❓</span>
            <span className="hidden md:inline">Quizz</span>
          </Link>
        )}

        {['admin', 'school', 'teacher', 'student'].includes(userRole) && (
          <>
            <Link
              to="/dashboard/schedules"
              className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
            >
              <span className="text-lg mr-2">🗓️</span>
              <span className="hidden md:inline">Schedules</span>
            </Link>
            <Link
              to="/dashboard/settings"
              className="transition-all mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
            >
              <span className="text-lg mr-2">⚙️</span>
              <span className="hidden md:inline">Settings</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
