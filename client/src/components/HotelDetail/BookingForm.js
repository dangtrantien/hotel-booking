import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import { userActions } from '../../store/user/user-slice';
import useHttp from '../../hooks/use-http';
import { host } from '../../store/store';

import styles from './BookingForm.module.css';

// ==================================================

const BookingForm = (props) => {
  const { hotelId } = useParams();
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const [rooms, setRooms] = useState([]);
  const [roomNumberList, setRoomNumberList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalBill, setTotalBill] = useState(0);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);

  // Khoảng thời gian user muốn đặt phòng
  const bookingDate =
    Math.round(
      (dateRange[0].endDate - dateRange[0].startDate) / (1000 * 60 * 60 * 24)
    ) + 1;

  const selectDateRangeHandler = (item) => {
    // Ngăn việc chọn lại ngày sau khi chọn room
    if (roomNumberList.length === 0) {
      setDateRange([item.selection]);

      // Render các room còn trống sau khi chọn ngày
      sendRequest({
        url: `${host}/hotels/empty-room?hotelId=${hotelId}&dateStart=${item.selection.startDate}`,
      })
        .then((result) => {
          if (result.error) {
            setRooms([]);
            return alert(result.message);
          }

          return setRooms(result);
        })
        .catch((err) => console.log(err));
    }
  };

  const enteredInputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(userActions.replaceUserState({ name, value }));
  };

  const checkboxChangeHandler = (checked, roomId, roomPrice, roomNumber) => {
    let newRoomNumberList = [...roomNumberList, { roomId, roomNumber }];

    // Nếu checked === true thì thêm số phòng và tăng tổng giá tiền
    if (checked) {
      setTotalBill((prev) => prev + roomPrice * bookingDate);

      // Nếu checked === false thì xóa số phòng và giảm tổng giá tiền
    } else {
      newRoomNumberList = newRoomNumberList.filter(
        (r) => r.roomNumber !== roomNumber
      );

      setTotalBill((prev) => prev - roomPrice * bookingDate);
    }

    setRoomNumberList(newRoomNumberList);
  };

  const selectChangeHandler = (e) => {
    setPaymentMethod(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      cardNumber: user.cardNumber,
    };

    const transactionData = {
      hotelId: hotelId,
      room: roomNumberList,
      dateStart: dateRange[0].startDate
        ? format(dateRange[0].startDate, 'MM/dd/yyyy')
        : null,
      dateEnd: dateRange[0].endDate
        ? format(dateRange[0].endDate, 'MM/dd/yyyy')
        : null,
      price: totalBill,
      payment: paymentMethod,
      status: 'Booked',
    };

    // Update user information
    sendRequest({
      url: `${host}/user`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: userData,
    });

    // Booking hotel room
    sendRequest({
      url: `${host}/hotels/transaction`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: transactionData,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        return navigate('/transaction', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      className={`container ${styles['form-container']}`}
      onSubmit={submitHandler}
    >
      <div className={styles['flex-container']}>
        <div>
          <h3>Dates</h3>

          <DateRange
            onChange={selectDateRangeHandler}
            minDate={new Date()}
            ranges={dateRange}
          />
        </div>

        <div className={styles['user-info--container']}>
          <h3>Reserve Info</h3>

          <div className={styles['form-control--container']}>
            <div>
              <label htmlFor='fullName'>Your Full Name:</label>
              <input
                id='fullName'
                name='fullName'
                type='text'
                value={user.fullName}
                onChange={enteredInputChangeHandler.bind(this)}
                placeholder='Full Name'
                required
              />
            </div>

            <div>
              <label htmlFor='email'>Your Email</label>
              <input
                id='email'
                name='email'
                type='email'
                value={user.email}
                onChange={enteredInputChangeHandler.bind(this)}
                placeholder='Email'
                required
              />
            </div>

            <div>
              <label htmlFor='phoneNumber'>Your Phone Number</label>
              <input
                id='phoneNumber'
                name='phoneNumber'
                type='text'
                value={user.phoneNumber}
                onChange={enteredInputChangeHandler.bind(this)}
                placeholder='Phone Number'
                required
              />
            </div>

            <div>
              <label htmlFor='cardNumber'>Your Identity Card Number</label>
              <input
                id='cardNumber'
                name='cardNumber'
                type='text'
                value={user.cardNumber}
                onChange={enteredInputChangeHandler.bind(this)}
                placeholder='Card Number'
                required
              />
            </div>
          </div>
        </div>
      </div>

      {rooms.length !== 0 && (
        <>
          <h3>Select Rooms</h3>

          <div className={styles['rooms-info--container']}>
            {rooms.map((room) => (
              <div key={room._id} className={styles['room-info']}>
                <div>
                  <p className={styles['room-info--title']}>{room.title}</p>

                  <p className={styles['room-info--description']}>
                    {room.desc}
                  </p>

                  <p className={styles['room-info--max-people']}>
                    Max people: <span>{room.maxPeople}</span>
                  </p>

                  <p className={styles['room-info--price']}>${room.price}</p>
                </div>

                <div className={styles['select-room--container']}>
                  {room.roomNumbers?.map((roomNumber, index) => (
                    <div
                      key={index}
                      className={styles['select-control--container']}
                    >
                      <label htmlFor={index}>{roomNumber}</label>
                      <input
                        id={index}
                        type='checkbox'
                        onChange={(e) =>
                          checkboxChangeHandler(
                            e.target.checked,
                            room._id,
                            room.price,
                            roomNumber
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <h3>Total Bill: ${totalBill}</h3>

      <div className={styles['action-container']}>
        <select
          id='payment'
          name='payment'
          onChange={selectChangeHandler.bind(this)}
        >
          <option value=''>Select Payment Method</option>
          <option value='Credit Card'>Credit Card</option>
          <option value='Cash'>Cash</option>
        </select>

        <button type='submit' className='btn'>
          Reserve Now
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
