import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userActions } from '../../../store/user/user-slice';
import { register } from '../../../store/user/user-actions';

import styles from '../AuthWrapper.module.css';

// ==================================================

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useSelector((state) => state.user.username);
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);

  const enteredInputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(userActions.replaceUserState({ name, value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    register(username, email, password)
      .then((result) => {
        if (result) {
          return alert(result);
        }

        alert('Successfully register!');

        return navigate('/login', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={styles['form-container']} onSubmit={submitHandler}>
      <input
        type='text'
        name='username'
        value={username}
        onChange={enteredInputChangeHandler.bind(this)}
        placeholder='Enter username'
        required
      />

      <input
        type='email'
        name='email'
        value={email}
        onChange={enteredInputChangeHandler.bind(this)}
        placeholder='Enter email'
        required
      />

      <input
        type='password'
        name='password'
        value={password}
        onChange={enteredInputChangeHandler.bind(this)}
        placeholder='Enter password'
        required
      />

      <button type='submit' className='btn'>
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
