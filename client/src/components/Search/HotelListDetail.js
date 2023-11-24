import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './HotelListDetail.module.css';

// ==================================================

const HotelListDetail = () => {
  const hotels = useSelector((state) => state.hotel.items);

  return (
    <div className={styles['list-container']}>
      {hotels.map((hotel) => (
        <div key={hotel._id} className={styles.card}>
          <img src={hotel.photos[0]} alt={hotel.title} />

          <div className={styles['card-content--detail']}>
            <h2>{hotel.title}</h2>

            <p className={styles['card-content--type']}>{hotel.type}</p>

            <p>{hotel.distance}m from center</p>

            <p className={styles['card-content--description']}>{hotel.desc}</p>
          </div>
          <div className={styles['card-content--price-container']}>
            <p>${hotel.cheapestPrice}</p>

            <span>Includes taxes and fees</span>

            <Link to={`/hotel/${hotel._id}`} className='btn' type='button'>
              See availability
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelListDetail;
