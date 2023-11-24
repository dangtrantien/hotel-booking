import Header from '../components/Home/Header';
import Featured from '../components/Home/Featured/Featured';
import PropertyList from '../components/Home/Property/PropertyList';
import HotelList from '../components/Home/HotelList';
import RegisterForm from '../components/Home/RegisterForm';

// ==================================================

const Home = () => {
  return (
    <>
      <Header />

      <div className='container'>
        <Featured />

        <PropertyList />

        <HotelList />
      </div>

      <RegisterForm />
    </>
  );
};

export default Home;
