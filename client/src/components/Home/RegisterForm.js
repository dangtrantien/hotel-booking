import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userActions } from '../../store/user/user-slice';

import styles from './RegisterForm.module.css';

// ==================================================

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    dispatch(
      userActions.replaceUserState({ name: 'email', value: e.target.value })
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    return navigate('/register', { replace: true });
  };

  return (
    <div className={styles['form-container']}>
      <div className={`container ${styles.container}`}>
        <h1>Save time, save money!</h1>

        <p>Sign up and we'll send the best deals to you</p>

        <form className={styles.form} onSubmit={submitHandler}>
          <input
            type='email'
            placeholder='Your Email'
            onChange={emailChangeHandler.bind(this)}
          />

          <button className='btn' type='submit'>
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
