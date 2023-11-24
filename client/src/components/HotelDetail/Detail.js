import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Slider from './Slider';
import useHttp from '../../hooks/use-http';
import BookingForm from './BookingForm';
import { host } from '../../store/store';

import styles from './Detail.module.css';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

// ==================================================

const Detail = () => {
  const { hotelId } = useParams();
  const token = sessionStorage.getItem('token');
  const sendRequest = useHttp();
  const navigate = useNavigate();

  const [hotelDetail, setHotelDetail] = useState({});
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState(false);

  const openHandler = (index) => {
    setSlideNumber(index);
    setOpen(true);
  };

  const slideHandler = (direction) => {
    let newSlideNumber;

    if (direction === 'left') {
      newSlideNumber =
        slideNumber === 0 ? hotelDetail.photos?.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === hotelDetail.photos?.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  // Kiểm tra user đã login hay chưa
  const bookingHandler = () => {
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      setBooking(true);
    }
  };

  useEffect(() => {
    sendRequest({
      url: `${host}/hotels/hotel/${hotelId}`,
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setHotelDetail(result);
      })
      .catch((err) => console.log(err));
  }, [hotelId, sendRequest]);

  return (
    <>
      <div className={`container ${styles.container}`}>
        <h2>{hotelDetail.name}</h2>

        <p className={styles['hotel-detail--location']}>
          <FontAwesomeIcon icon={faLocationDot} />

          {hotelDetail.address}
        </p>

        <p className={styles['hotel-detail--distance']}>
          Excellent location - {hotelDetail.distance}m from center
        </p>

        <p className={styles['hotel-detail--price-text']}>
          Book a stay over ${hotelDetail.cheapestPrice} at this property and get
          a free airport taxi
        </p>

        <div className={styles['img-container']}>
          {hotelDetail.photos?.map((img, index) => (
            <div key={index} className={styles.image}>
              <img
                src={img}
                alt={`hotel-detail-${index}`}
                onClick={openHandler.bind(null, index)}
              />
            </div>
          ))}
        </div>

        <div className={styles['hotel-detail--container']}>
          <div className={styles['hotel-detail--description']}>
            <h2>{hotelDetail.title}</h2>

            <p>{hotelDetail.desc}</p>
          </div>

          <div className={styles['hotel-detail--booking']}>
            <p>
              <span>${hotelDetail.cheapestPrice}</span>
              (1 nights)
            </p>

            <button className='btn' type='button' onClick={bookingHandler}>
              Reserve or Book Now!
            </button>
          </div>
        </div>
      </div>

      {open && (
        <Slider
          open={open}
          onClose={() => setOpen(false)}
          onSlide={slideHandler}
          image={hotelDetail.photos[slideNumber]}
        />
      )}

      {booking && <BookingForm rooms={hotelDetail.rooms} />}
    </>
  );
};

export default Detail;
