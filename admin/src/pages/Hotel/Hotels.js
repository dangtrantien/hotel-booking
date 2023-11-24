import { Link } from 'react-router-dom';

import HotelList from '../../components/Hotel/HotelList';

// ==================================================

const HotelsPage = () => {
  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <h2>Hotels List</h2>

        <Link to='/new-hotel' className='btn add-btn'>
          Add New
        </Link>
      </div>

      <HotelList />
    </>
  );
};

export default HotelsPage;
