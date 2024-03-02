import Header from './components/Header';
import Prices from './components/Prices';
import Info from './components/Info';

function Home() {
  return (
    <>
      <Header />
      <div className="px-16">
        {' '}
        <Prices />
        <Info />
      </div>
    </>
  );
}

export default Home;
