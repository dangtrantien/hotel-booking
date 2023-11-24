import { useState, useEffect } from 'react';

import useHttp from '../../../hooks/use-http';
import { host } from '../../../store/store';

import styles from './PropertyItem.module.css';

// ==================================================

const PropertyItem = (props) => {
  const sendRequest = useHttp();

  const [type, setType] = useState({});

  useEffect(() => {
    sendRequest({
      url: `${host}/hotels/type?type=${props.type}`,
    })
      .then((result) =>
        setType({
          title: props.title,
          image: props.image,
          count: result.length,
        })
      )
      .catch((err) => console.log(err));
  }, [sendRequest, props.title, props.type, props.image]);

  return (
    <div className={styles.card}>
      <img src={type.image} alt={type.type} />

      <h3>{type.title}</h3>

      <p>{type.count} hotels</p>
    </div>
  );
};

export default PropertyItem;
