import { Link } from 'react-router-dom';

const SideBar = () => {
  const userRole = localStorage.getItem('userRole');
  console.log(userRole);
  return (
    <div className="xl:w-48 sm:w-18 h-screen bg-gray-800 text-white">
      <div className="flex flex-col p-4">
        <Link
          to="/profile"
          className="p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">👤</span>
          <span className="hidden md:inline">Profile</span>
        </Link>
        <Link
          to="/schools"
          className="mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">🏫</span>
          <span className="hidden md:inline">Schools</span>
        </Link>
        <Link
          to="/courses"
          className="mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">📚</span>
          <span className="hidden md:inline">Courses</span>
        </Link>
        <Link
          to="/students"
          className="mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">👥</span>
          <span className="hidden md:inline">Students</span>
        </Link>
        <Link
          to="/quizz"
          className="mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">❓</span>
          <span className="hidden md:inline">Quizz</span>
        </Link>
        <Link
          to="/schedules"
          className="mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">🗓️</span>
          <span className="hidden md:inline">Schedules</span>
        </Link>
        <Link
          to="/settings"
          className="mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">⚙️</span>
          <span className="hidden md:inline">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
