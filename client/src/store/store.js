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

// export const host = 'http://localhost:5000';
export const host = 'https://hotel-booking-server-dangtrantien.vercel.app';

export default store;
