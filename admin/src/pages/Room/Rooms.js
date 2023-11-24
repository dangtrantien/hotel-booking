import { Link } from 'react-router-dom';

import RoomList from '../../components/Room/RoomList';

// ==================================================

const RoomsPage = () => {
  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <h2>Rooms List</h2>

        <Link to='/new-room' className='btn add-btn'>
          Add New
        </Link>
      </div>

      <RoomList />
    </>
  );
};

export default RoomsPage;
