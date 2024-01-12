import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const SideBar = () => {
  const token = localStorage.getItem('token');
  let userRole = '';

  if (token) {
    const decodedToken: { role: string } = jwtDecode(token);
    userRole = decodedToken.role;
  }

  return (
    <div className="bg-gray-800 text-white hidden md:block">
      <div className="flex flex-col py-4 px-4">
        <NavLink
          to="/dashboard/main"
          className={({ isActive }) =>
            'transition-all py-2 px-4 rounded-full flex items-center' +
            (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
          }
        >
          <span className="text-lg mr-2">🏠</span>
          <span className="md:inline">Dashboard</span>
        </NavLink>

        {['admin', 'school', 'teacher', 'student'].includes(userRole) && (
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              'transition-all py-2 px-4  mt-4 rounded-full flex items-center' +
              (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
            }
          >
            <span className="text-lg mr-2">👤</span>
            <span className="md:inline">Profile</span>
          </NavLink>
        )}

        {['admin'].includes(userRole) && (
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              'transition-all py-2 px-4  mt-4 rounded-full flex items-center' +
              (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
            }
          >
            <span className="text-lg mr-2">👥</span>
            <span className="md:inline">Users</span>
          </NavLink>
        )}

        {['admin', 'teacher'].includes(userRole) && (
          <NavLink
            to="/dashboard/schools"
            className={({ isActive }) =>
              'transition-all py-2 px-4  mt-4 rounded-full flex items-center' +
              (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
            }
          >
            <span className="text-lg mr-2">🏫</span>
            <span className="md:inline">Schools</span>
          </NavLink>
        )}

        {['admin', 'school'].includes(userRole) && (
          <>
            <NavLink
              to="/dashboard/courses"
              className={({ isActive }) =>
                'transition-all py-2 px-4  mt-4 rounded-full flex items-center' +
                (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
              }
            >
              <span className="text-lg mr-2">📚</span>
              <span className="md:inline">Courses</span>
            </NavLink>
            <NavLink
              to="/dashboard/students"
              className={({ isActive }) =>
                'transition-all py-2 px-4  mt-4 rounded-full flex items-center' +
                (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
              }
            >
              <span className="text-lg mr-2">👥</span>
              <span className="md:inline">Students</span>
            </NavLink>
          </>
        )}

        {['admin', 'teacher'].includes(userRole) && (
          <NavLink
            to="/dashboard/quizz"
            className={({ isActive }) =>
              'transition-all py-2 px-4  mt-4 rounded-full flex items-center' +
              (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
            }
          >
            <span className="text-lg mr-2">❓</span>
            <span className="md:inline">Quizz</span>
          </NavLink>
        )}

        {['admin', 'school', 'teacher', 'student'].includes(userRole) && (
          <>
            <NavLink
              to="/dashboard/schedules"
              className={({ isActive }) =>
                'transition-all py-2 px-4  mt-4 rounded-full flex items-center' +
                (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
              }
            >
              <span className="text-lg mr-2">🗓️</span>
              <span className="md:inline">Schedules</span>
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                'transition-all py-2 px-4  mt-4 rounded-full flex items-center' +
                (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
              }
            >
              <span className="text-lg mr-2">⚙️</span>
              <span className="md:inline">Settings</span>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
