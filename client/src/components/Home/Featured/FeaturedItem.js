import { useEffect, useState } from 'react';

import useHttp from '../../../hooks/use-http';
import { host } from '../../../store/store';

import styles from './FeaturedItem.module.css';

// ==================================================

const FeaturedItem = (props) => {
  const sendRequest = useHttp();

  const [city, setCity] = useState({});

  useEffect(() => {
    sendRequest({
      url: `${host}/hotels/city?city=${props.name}`,
    })
      .then((result) =>
        setCity({
          name: props.name,
          image: props.image,
          properies: result.length,
        })
      )
      .catch((err) => console.log(err));
  }, [sendRequest, props.name, props.image]);

  return (
    <div className={styles['card-container']}>
      <img src={city.image} alt={city.name} />

      <div className={styles['card-content']}>
        <h2>{city.name}</h2>
        <p>{city.properies} properties</p>
      </div>
    </div>
  );
};

export default FeaturedItem;
