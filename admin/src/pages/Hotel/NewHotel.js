import Card from '../../components/UI/Card';
import HotelForm from '../../components/Hotel/HotelForm';

// ==================================================

const NewHotelPage = () => {
  return (
    <>
      <Card className='p-1'>
        <h2>Add New Product</h2>
      </Card>

      <HotelForm />
    </>
  );
};

export default NewHotelPage;
