import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Card from '../UI/Card';
import useHttp from '../../hooks/use-http';
import { hotelActions } from '../../store/hotel/hotel-slice';
import { getHotel } from '../../store/hotel/hotel-actions';
import { host } from '../../store/store';

import styles from './HotelForm.module.css';

// ==================================================

const HotelForm = () => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const location = useLocation();
  const navigate = useNavigate();

  const hotel = useSelector((state) => state.hotel);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(hotelActions.replaceHotelState({ name, value }));
  };

  const textareaChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value.split('\n');

    dispatch(hotelActions.replaceHotelState({ name, value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Add new product
    let url = `${host}/admin/hotel`;
    let method = 'POST';

    // Edit product
    if (location.state) {
      url = `${host}/admin/hotel/${location.state.hotelId}`;
      method = 'PUT';
    }

    sendRequest({
      url: url,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: hotel,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        return navigate('/hotels', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Lấy data của hotel nếu là edit mode
    if (location.state) {
      dispatch(getHotel(location.state.hotelId));
    } else {
      dispatch(hotelActions.addNewHotel());
    }
  }, [location.state, dispatch]);

  return (
    <Card className={styles['card-container']}>
      <form className={styles['form-container']} onSubmit={submitHandler}>
        <div className={styles['control-container']}>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            name='name'
            type='text'
            value={hotel.name}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Product name'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='type'>Type</label>
          <input
            id='type'
            name='type'
            type='text'
            value={hotel.type}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Product type'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='city'>City</label>
          <input
            id='city'
            name='city'
            type='text'
            value={hotel.city}
            onChange={inputChangeHandler.bind(this)}
            placeholder='City'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='address'>Address</label>
          <input
            id='address'
            name='address'
            type='text'
            value={hotel.address}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Product address'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='distance'>Distance from City Center</label>
          <input
            id='distance'
            name='distance'
            type='text'
            value={hotel.distance}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Distance'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            name='title'
            type='text'
            value={hotel.title}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Product title'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='desc'>Desciption</label>
          <input
            id='desc'
            name='desc'
            type='text'
            value={hotel.desc}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Product description'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='cheapestPrice'>Price</label>
          <input
            id='cheapestPrice'
            name='cheapestPrice'
            type='number'
            value={hotel.cheapestPrice}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Product cheapest price'
            min={0}
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='photos'>Images</label>
          <textarea
            id='photos'
            name='photos'
            value={hotel.photos.join('\n')}
            onChange={textareaChangeHandler.bind(this)}
            placeholder='Line break after each information'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='featured'>Featured</label>
          <select
            id='featured'
            name='featured'
            value={hotel.featured}
            onChange={inputChangeHandler.bind(this)}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <div
          className={`${styles['control-container']} ${styles['control-rooms--container']}`}
        >
          <label htmlFor='rooms'>Rooms</label>
          <textarea
            id='rooms'
            name='rooms'
            value={hotel.rooms.join('\n')}
            disabled
          />
        </div>

        <button className='btn' type='submit'>
          Send
        </button>
      </form>
    </Card>
  );
};

export default HotelForm;
