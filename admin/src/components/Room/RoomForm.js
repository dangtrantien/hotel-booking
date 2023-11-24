import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Card from '../UI/Card';
import useHttp from '../../hooks/use-http';
import { roomActions } from '../../store/room/room-slice';
import { getRoom } from '../../store/room/room-actions';
import { host } from '../../store/store';

import styles from './RoomForm.module.css';

// ==================================================

const RoomForm = () => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const location = useLocation();
  const navigate = useNavigate();

  const room = useSelector((state) => state.room);
  const [hotels, setHotels] = useState([]);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(roomActions.replaceRoomState({ name, value }));
  };

  const textareaChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value.split(',');

    dispatch(roomActions.replaceRoomState({ name, value }));
  };

  const selectChangeHandler = (e) => {
    dispatch(
      roomActions.replaceRoomState({ name: 'hotelId', value: e.target.value })
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Add new product
    let url = `${host}/admin/room`;
    let method = 'POST';

    // Edit product
    if (location.state) {
      url = `${host}/admin/room/${location.state.roomId}`;
      method = 'PUT';
    }

    sendRequest({
      url: url,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: room,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        return navigate('/rooms', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  // Lấy data của tất cả các hotel
  useEffect(() => {
    sendRequest({ url: `${host}/hotels` })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        return setHotels(result);
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  // Lấy data của room nếu là edit mode
  useEffect(() => {
    if (location.state) {
      dispatch(getRoom(location.state.roomId));
    } else {
      dispatch(roomActions.addNewRoom());
    }
  }, [location.state, dispatch]);

  return (
    <Card className={styles['card-container']}>
      <form className={styles['form-container']} onSubmit={submitHandler}>
        <div className={styles['control-container']}>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            name='title'
            type='text'
            value={room.title}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Room title'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='desc'>Desciption</label>
          <input
            id='desc'
            name='desc'
            type='text'
            value={room.desc}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Room description'
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='price'>Price</label>
          <input
            id='price'
            name='price'
            type='number'
            value={room.price}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Room price'
            min={0}
            required
          />
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='maxPeople'>Max People</label>
          <input
            id='maxPeople'
            name='maxPeople'
            type='number'
            value={room.maxPeople}
            onChange={inputChangeHandler.bind(this)}
            placeholder='Room max people'
            min={0}
            required
          />
        </div>

        <div className={styles.container}>
          <div className={styles['control-container']}>
            <label htmlFor='roomNumbers'>Rooms</label>
            <textarea
              id='roomNumbers'
              name='roomNumbers'
              value={room.roomNumbers}
              onChange={textareaChangeHandler.bind(this)}
              placeholder='Give comma between room numbers'
              required
            />
          </div>

          <div className={styles['control-container']}>
            <label htmlFor='hotel'>Choose a hotel</label>
            <select
              id='hotel'
              name='hotel'
              value={room.hotelId}
              onChange={selectChangeHandler.bind(this)}
              required
            >
              <option value=''>Select hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel._id} value={hotel._id}>
                  {hotel.name}
                </option>
              ))}
            </select>
          </div>

          <button className='btn' type='submit'>
            Send
          </button>
        </div>
      </form>
    </Card>
  );
};

export default RoomForm;
