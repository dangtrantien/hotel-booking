import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userActions } from '../../../store/user/user-slice';
import { login } from '../../../store/user/user-actions';

import styles from '../AuthWrapper.module.css';

// ==================================================

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);

  const enteredInputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(userActions.replaceUserState({ name, value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password))
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        alert('Successfully login!');

        return navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={styles['form-container']} onSubmit={submitHandler}>
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
        Login
      </button>
    </form>
  );
};

export default LoginForm;
