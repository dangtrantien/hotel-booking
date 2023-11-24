import { createSlice } from '@reduxjs/toolkit';

// ==================================================

const IntialHotelState = {
  name: '',
  type: '',
  title: '',
  city: '',
  address: '',
  distance: '',
  photos: [],
  desc: '',
  featured: false,
  cheapestPrice: 0,
  rooms: [],
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: IntialHotelState,
  reducers: {
    replaceHotelState(state, action) {
      Object.keys(state).map((key) => {
        if (action.payload.name === key) {
          state[key] = action.payload.value;
        }

        return null;
      });
    },
    // Cài lại value
    addNewHotel(state) {
      Object.keys(state).map((key) => (state[key] = IntialHotelState[key]));
    },
  },
});

export const hotelActions = hotelSlice.actions;

export default hotelSlice.reducer;
