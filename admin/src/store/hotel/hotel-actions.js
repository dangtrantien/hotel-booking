import { hotelActions } from './hotel-slice';
import { host } from '../store';

// ==================================================

export const getHotel = (hotelId) => {
  return async (dispatch) => {
    const response = await fetch(`${host}/hotels/hotel/${hotelId}`);

    const resData = await response.json();

    if (!response.ok) {
      return alert(resData.message);
    }

    return Object.keys(resData).map((key) =>
      dispatch(
        hotelActions.replaceHotelState({ name: key, value: resData[key] })
      )
    );
  };
};
