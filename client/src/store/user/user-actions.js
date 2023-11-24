import { userActions } from './user-slice';
import { host } from '../store';

// ==================================================

export const getUser = () => {
  const token = sessionStorage.getItem('token');

  return async (dispatch) => {
    const response = await fetch(`${host}/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bear ${token}`,
      },
    });

    const resData = await response.json();

    if (!response.ok) {
      return { error: true, message: resData.message };
    }

    return Object.keys(resData).map((key) =>
      dispatch(userActions.replaceUserState({ name: key, value: resData[key] }))
    );
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(`${host}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const resData = await response.json();

    if (!response.ok) {
      return { error: true, message: resData.message };
    }

    if (resData.isAdmin) {
      return { message: 'This email is for admin only!' };
    }

    sessionStorage.setItem('token', resData.token);

    return Object.keys(resData).map((key) =>
      dispatch(userActions.replaceUserState({ name: key, value: resData[key] }))
    );
  };
};

export const register = async (username, email, password) => {
  const response = await fetch(`${host}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      isAdmin: false,
    }),
  });

  const resData = await response.json();

  if (!response.ok) {
    return resData.message;
  }
};
