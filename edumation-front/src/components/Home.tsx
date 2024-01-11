function Home() {
  return (
    <header
      id="up"
      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen relative"
    >
      <div className="h-screen bg-opacity-50 bg-black flex items-center justify-center">
        <div className="mx-2 text-center">
          <h1 className="text-white font-extrabold text-4xl xs:text-5xl md:text-6xl">
            Right Place To
          </h1>
          <h2 className="text-white font-extrabold text-2xl xs:text-4xl md:text-5xl leading-tight">
            Manage time and learning for Schools, Teachers & Students
          </h2>
          <div className="inline-flex">
            <button className="p-2 my-5 mx-2 bg-indigo-700 hover:bg-indigo-800 font-bold text-white rounded border-2 border-transparent hover:border-indigo-800 shadow-md transition duration-500 md:text-xl">
              Discover
            </button>
            <a href="#about">
              <button className="p-2 my-5 mx-2 bg-transparent border-2 bg-indigo bg-opacity-75 hover:bg-opacity-100 border-white rounded hover:border-indigo-800 font-bold text-white hover:text-indigo-800 shadow-md transition duration-500 md:text-lg">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;
