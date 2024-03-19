import Header from './components/Header';
import Prices from './components/Prices';
import Info from './components/Info';

function Home() {
  return (
    <>
      <Header />
      <div className="px-16 bg-white dark:bg-slate-800 h-screen">
        <Prices />
        <Info />
      </div>
    </>
  );
}

export default Home;
