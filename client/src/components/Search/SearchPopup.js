import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import useHttp from '../../hooks/use-http';
import { hotelActions } from '../../store/hotel/hotel-slice';
import { host } from '../../store/store';

import styles from './SearchPopup.module.css';

// ==================================================

const SearchPopup = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const sendRequest = useHttp();

  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateRange, setDateRange] = useState(location.state.dateRange);

  const selectDateRangeHandler = (item) => {
    setDateRange([item.selection]);
  };

  const optionsChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setOptions({ ...options, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const searchData = {
      city: destination,
      startDate: dateRange[0].startDate,
      maxPeople: options.adult + options.children,
      roomCount: options.room,
    };

    sendRequest({
      url: `${host}/hotels/search`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: searchData,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        return dispatch(hotelActions.replaceHotelState(result));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles['search-popup--container']}>
      <h2>Search</h2>

      <form className={styles['form-container']} onSubmit={submitHandler}>
        <div className={styles['control-container']}>
          <label htmlFor='city'>Destination</label>
          <input
            id='city'
            name='city'
            type='text'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className={styles['control-container']}>
          <label>Check-in Date</label>

          <p
            onClick={() => setOpenCalendar(!openCalendar)}
            className={styles['calendar-content']}
          >
            {format(dateRange[0].startDate, 'MM/dd/yyyy')} to{' '}
            {format(dateRange[0].endDate, 'MM/dd/yyyy')}
          </p>

          {openCalendar && (
            <DateRange
              className={styles.calendar}
              onChange={selectDateRangeHandler}
              minDate={new Date()}
              ranges={dateRange}
            />
          )}
        </div>

        <div className={styles['control-container']}>
          <label htmlFor='options'>Options</label>

          <ul>
            <li>
              <p>Adult</p>
              <input
                id='options'
                name='adult'
                type='number'
                value={options.adult}
                onChange={optionsChangeHandler.bind(this)}
                min={0}
              />
            </li>

            <li>
              <p>Children</p>
              <input
                id='options'
                name='children'
                type='number'
                value={options.children}
                onChange={optionsChangeHandler.bind(this)}
                min={0}
              />
            </li>

            <li>
              <p>Room</p>
              <input
                id='options'
                name='room'
                type='number'
                value={options.room}
                onChange={optionsChangeHandler.bind(this)}
                min={0}
              />
            </li>
          </ul>
        </div>

        <button className={`btn ${styles.button}`} type='submit'>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchPopup;
