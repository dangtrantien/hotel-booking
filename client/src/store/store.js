import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/user-slice';
import hotelReducer from './hotel/hotel-slice';

// ==================================================

const store = configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,
  },
});

// export const host = 'http://192.168.1.107:5000';
export const host = 'https://booking-server-dangtrantien.vercel.app';

export default store;
