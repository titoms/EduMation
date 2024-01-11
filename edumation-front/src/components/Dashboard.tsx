import Sidebar from './SideBar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        {/* Dashboard Content Goes Here */}
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
