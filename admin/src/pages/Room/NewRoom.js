import Card from '../../components/UI/Card';
import RoomForm from '../../components/Room/RoomForm';

// ==================================================

const NewRoomPage = () => {
  return (
    <>
      <Card className='p-1'>
        <h2>Add New Room</h2>
      </Card>

      <RoomForm />
    </>
  );
};

export default NewRoomPage;
