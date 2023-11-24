import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

// ==================================================

const Modal = (props) => {
  return (
    <>
      {/* Tạo portal render modal thông qua id=overlays */}
      {ReactDOM.createPortal(
        <div className={props.open ? styles.open : styles.close}>
          <div className={styles.backdrop} onClick={props.onClose} />

          <div className={`${props.className} ${styles.modal}`}>
            {props.children}
          </div>
        </div>,
        document.getElementById('overlays')
      )}
    </>
  );
};

export default Modal;
