const Info = () => {
  return (
    <>
      <div className="flex flex-wrap py-20 px-4 mb-2">
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
          <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Total Revenue</h5>
                <h3 className="text-white text-3xl">
                  3249&euro;
                  <span className="text-green-400">
                    <i className="fas fa-caret-down"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
          <div className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-users fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Total Users</h5>
                <h3 className="text-white text-3xl">
                  13{' '}
                  <span className="text-blue-400">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
          <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right pr-1">
                <h5 className="text-white">New Users</h5>
                <h3 className="text-white text-3xl">
                  2{' '}
                  <span className="text-orange-400">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-3 xl:pr-2">
          <div className="bg-gradient-to-r from-green-200 via-green-300 to-blue-500 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-server fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Server Uptime</h5>
                <h3 className="text-white text-3xl">76 days</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pl-2 xl:pr-3">
          <div className="bg-gradient-to-r from-pink-400 to-pink-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">To Do List</h5>
                <h3 className="text-white text-3xl">7 tasks</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
          <div className="bg-gradient-to-r from-green-200 to-green-500 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Issues</h5>
                <h3 className="text-white text-3xl">
                  3{' '}
                  <span className="text-pink-400">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
