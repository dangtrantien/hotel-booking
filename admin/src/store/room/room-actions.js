import { roomActions } from './room-slice';
import { host } from '../store';

// ==================================================

export const getRoom = (roomId) => {
  const token = sessionStorage.getItem('token');

  return async (dispatch) => {
    const response = await fetch(`${host}/hotels/room/${roomId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bear ${token}`,
      },
      body: null,
    });

    const resData = await response.json();

    if (!response.ok) {
      return alert(resData.message);
    }

    return Object.keys(resData).map((key) =>
      dispatch(roomActions.replaceRoomState({ name: key, value: resData[key] }))
    );
  };
};
