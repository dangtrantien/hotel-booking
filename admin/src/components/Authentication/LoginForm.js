import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { host } from '../../store/store';

import styles from './AuthWrapper.module.css';

// ==================================================

const LoginForm = () => {
  const navigate = useNavigate();
  const sendRequest = useHttp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const enteredInputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    sendRequest({
      url: `${host}/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { email, password },
    })
      .then((result) => {
        if (result.error) {
          return alert(result.message);
        }

        if (!result.isAdmin) {
          return alert(
            "This email is not available! Only admin's email can login"
          );
        }

        sessionStorage.setItem('token', result.token);

        alert('Successfully login');

        return navigate('/dashboard', { replace: true });
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
