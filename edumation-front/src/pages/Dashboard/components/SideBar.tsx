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
    <>
      <div className="flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-gray-800 text-white transition-all duration-300 border-none z-10 sidebar">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                  Main
                </div>
              </div>
            </li>
            <li>
              <NavLink
                to="/dashboard/"
                className={({ isActive }) =>
                  'relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-800 pr-6'
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  🏠
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Dashboard
                </span>
              </NavLink>
            </li>
            {['admin'].includes(userRole) && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                      'relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-800 pr-6' +
                      (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      👥
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Users
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            {['admin', 'teacher'].includes(userRole) && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/schools"
                    className={({ isActive }) =>
                      'relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-800 pr-6' +
                      (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      🏫
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Schools
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/quizz"
                    className={({ isActive }) =>
                      'relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-800 pr-6' +
                      (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      ❓
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Quizz
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            {['admin', 'school'].includes(userRole) && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/courses"
                    className={({ isActive }) =>
                      'relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-800 pr-6' +
                      (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      📚
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Courses
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/students"
                    className={({ isActive }) =>
                      'relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-800 pr-6' +
                      (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      👥
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Students
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            {['admin', 'school', 'teacher', 'student'].includes(userRole) && (
              <>
                <NavLink
                  to="/dashboard/schedules"
                  className={({ isActive }) =>
                    'relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-800 pr-6' +
                    (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
                  }
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    🗓️
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Schedules
                  </span>
                </NavLink>
              </>
            )}
            {/* SETTINGS */}
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center mt-5 h-8">
                <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                  Settings
                </div>
              </div>
            </li>
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  'relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-800 pr-6' +
                  (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  👤
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Profile
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  'relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-800 pr-6' +
                  (isActive ? ' bg-gray-700' : ' hover:bg-gray-700')
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  ⚙️
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Settings
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
