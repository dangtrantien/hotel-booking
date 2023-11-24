import { configureStore } from '@reduxjs/toolkit';

import hotelReducer from './hotel/hotel-slice';
import roomReducer from './room/room-slice';
import transactionReducer from './transaction/transaction-slice';

// ==================================================

const store = configureStore({
  reducer: {
    hotel: hotelReducer,
    room: roomReducer,
    transaction: transactionReducer,
  },
});

// export const host = 'http://localhost:5000';
export const host = 'https://hotel-booking-server-dangtrantien.vercel.app';

export default store;
