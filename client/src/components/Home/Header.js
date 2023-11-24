import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import useHttp from '../../hooks/use-http';
import { hotelActions } from '../../store/hotel/hotel-slice';
import { host } from '../../store/store';

import styles from './Header.module.css';

// ==================================================

const Header = () => {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const [destination, setDestination] = useState('');
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const selectDateRangeHandler = (item) => {
    setDateRange([item.selection]);
  };

  const selectOptionsHandler = (name, action) => {
    // Tăng hoặc giảm value khi onClick
    const value = action === 'increase' ? options[name] + 1 : options[name] - 1;

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

        dispatch(hotelActions.replaceHotelState(result));

        return navigate('/hotels', {
          replace: true,
          state: { destination, dateRange, options },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles['home-header--container']}>
      <div className='container'>
        <div className={styles['home-header--content']}>
          <h1>A lifetime of discounts? It's Genius.</h1>

          <p>
            Get rewarded for your travels - unlock instant savings of 10% or
            more with a free acount
          </p>

          <button className='btn'>Sign in / Register</button>
        </div>

        <form
          className={`container ${styles['form-container']}`}
          onSubmit={submitHandler}
        >
          <div className={styles['control-container']}>
            <i className='fa fa-bed' />

            <input
              type='text'
              placeholder='Where are you going?'
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className={styles['control-container']}>
            <i className='fa fa-calendar' />

            <p onClick={() => setOpenCalendar(!openCalendar)}>
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
            <i className='fa fa-female' />

            <p
              onClick={() => setOpenOptions(!openOptions)}
              className={styles['options-input--container']}
            >
              {options.adult} adult • {options.children} children •{' '}
              {options.room} room
            </p>

            {openOptions && (
              <div className={styles['option-container']}>
                <div className={styles['option-item']}>
                  <p>Adult</p>

                  <div className={styles['option-counter']}>
                    <button
                      type='button'
                      disabled={options.adult <= 1}
                      onClick={() => selectOptionsHandler('adult', 'decrease')}
                    >
                      -
                    </button>

                    <p>{options.adult}</p>

                    <button
                      type='button'
                      onClick={() => selectOptionsHandler('adult', 'increase')}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles['option-item']}>
                  <p>Children</p>

                  <div className={styles['option-counter']}>
                    <button
                      type='button'
                      disabled={options.children <= 0}
                      onClick={() =>
                        selectOptionsHandler('children', 'decrease')
                      }
                    >
                      -
                    </button>

                    <p>{options.children}</p>

                    <button
                      type='button'
                      onClick={() =>
                        selectOptionsHandler('children', 'increase')
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles['option-item']}>
                  <p>Room</p>

                  <div className={styles['option-counter']}>
                    <button
                      type='button'
                      disabled={options.room <= 1}
                      onClick={() => selectOptionsHandler('room', 'decrease')}
                    >
                      -
                    </button>

                    <p>{options.room}</p>

                    <button
                      type='button'
                      onClick={() => selectOptionsHandler('room', 'increase')}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button type='submit' className='btn'>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
