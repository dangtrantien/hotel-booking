import { useState, useEffect } from 'react';

import useHttp from '../../hooks/use-http';
import Card from '../UI/Card';

import styles from './InfoBoardItem.module.css';

// ==================================================

const InfoBoardItem = (props) => {
  const sendRequest = useHttp();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    sendRequest({ url: props.url })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        setTotal(result.total);
      })
      .catch((err) => console.log(err));
  }, [sendRequest, props.url]);

  return (
    <Card className={styles['card-container']}>
      <div className={styles.card}>
        <p className={styles.title}>{props.title}</p>

        <p className={styles.total}>
          {props.isMoney ? `$ ${total.toLocaleString('de-DE')}` : total}
        </p>

        {props.icon}
      </div>
    </Card>
  );
};

export default InfoBoardItem;
