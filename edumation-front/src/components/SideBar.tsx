import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="xl:w-48 sm:w-18 h-screen bg-gray-800 text-white">
      <div className="flex flex-col p-4">
        <Link
          to="/dashboard/profile"
          className="p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">👤</span>
          <span className="hidden md:inline">Profile</span>
        </Link>
        <Link
          to="/dashboard/schools"
          className="mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">🏫</span>
          <span className="hidden md:inline">Schools</span>
        </Link>
        <Link
          to="/dashboard/courses"
          className="mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">📚</span>
          <span className="hidden md:inline">Courses</span>
        </Link>
        <Link
          to="/dashboard/students"
          className="mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">👥</span>
          <span className="hidden md:inline">Students</span>
        </Link>
        <Link
          to="/dashboard/quizz"
          className="mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">❓</span>
          <span className="hidden md:inline">Quizz</span>
        </Link>
        <Link
          to="/dashboard/schedules"
          className="mt-4 p-2 hover:bg-gray-700 rounded-full flex items-center"
        >
          <span className="text-lg mr-2">🗓️</span>
          <span className="hidden md:inline">Schedules</span>
        </Link>
        <Link
          to="/dashboard/settings"
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
