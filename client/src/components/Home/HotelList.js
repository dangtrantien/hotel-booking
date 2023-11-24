import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { host } from '../../store/store';

import styles from './HotelList.module.css';

// ==================================================

const HotelList = () => {
  const sendRequest = useHttp();

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    sendRequest({
      url: `${host}/hotels/top-rating`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        return setHotels(result);
      })
      .catch((err) => console.log(err));
  }, [sendRequest]);

  return (
    <section className={styles['section-hotel']}>
      <h2>Homes guests love</h2>

      <div className={styles['card-container']}>
        {hotels.map((hotel) => (
          <div key={hotel._id} className={styles.card}>
            <img src={hotel.photos[0]} alt={hotel.name} />

            <Link to={`/hotel/${hotel._id}`}>{hotel.name}</Link>

            <p className={styles['card-content--city']}>{hotel.city}</p>

            <p>Starting from ${hotel.cheapestPrice}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelList;
