import { jwtDecode } from 'jwt-decode';
import NavSection from '../ui/sidebar/NavSection';
import NavLinkItem from '../ui/sidebar/NavLinkItem';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  const token = localStorage.getItem('token');
  let userRole = '';

  if (token) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
  }

  return (
    <div className="flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-gray-200 dark:bg-gray-900 dark:text-white text-black transition-all duration-300 border-none z-10 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4">
          <NavSection title="Main">
            <NavLink
              to="/dashboard/"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-300 dark:hover:bg-slate-800 text-black dark:text-white hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-blue-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                🏠
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Dashboard
              </span>
            </NavLink>
            {['admin'].includes(userRole) && (
              <NavLinkItem
                to="/dashboard/users"
                icon="👥"
                label="Users"
                roles={['admin']}
                userRole={userRole}
              />
            )}
            {['admin', 'teacher'].includes(userRole) && (
              <>
                <NavLinkItem
                  to="/dashboard/schools"
                  icon="🏫"
                  label="Schools"
                  roles={['admin', 'teacher']}
                  userRole={userRole}
                />
                <NavLinkItem
                  to="/dashboard/quizz"
                  icon="❓"
                  label="Quizz"
                  roles={['admin', 'teacher']}
                  userRole={userRole}
                />
              </>
            )}
            {['admin', 'school'].includes(userRole) && (
              <>
                <NavLinkItem
                  to="/dashboard/classes"
                  icon="👥"
                  label="Classes"
                  roles={['admin', 'school']}
                  userRole={userRole}
                />
                <NavLinkItem
                  to="/dashboard/courses"
                  icon="📚"
                  label="Courses"
                  roles={['admin', 'school']}
                  userRole={userRole}
                />
                <NavLinkItem
                  to="/dashboard/students"
                  icon="👥"
                  label="Students"
                  roles={['admin', 'school']}
                  userRole={userRole}
                />
              </>
            )}
            {['admin', 'school', 'teacher', 'student'].includes(userRole) && (
              <NavLinkItem
                to="/dashboard/schedules"
                icon="🗓️"
                label="Schedules"
                roles={['admin', 'school', 'teacher', 'student']}
                userRole={userRole}
              />
            )}
          </NavSection>
          <NavSection title="Settings">
            <NavLinkItem
              to="/dashboard/profile"
              icon="👤"
              label="Profile"
              roles={['admin', 'teacher', 'student']}
              userRole={userRole}
            />
            <NavLinkItem
              to="/dashboard/settings"
              icon="⚙️"
              label="Settings"
              roles={['admin', 'teacher', 'student']}
              userRole={userRole}
            />
          </NavSection>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
