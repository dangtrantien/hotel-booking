import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Slider.module.css';
import {
  faCircleXmark,
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';

// ==================================================

const Slider = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.slider}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={styles['close-icon']}
            onClick={props.onClose}
          />

          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className={styles['arrow-icon']}
            onClick={() => props.onSlide('left')}
          />

          <div className={styles['slide-img']}>
            <img src={props.image} alt='hotel' />
          </div>

          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className={styles['arrow-icon']}
            onClick={() => props.onSlide('right')}
          />
        </div>,
        document.getElementById('overlays')
      )}
    </>
  );
};

export default Slider;
