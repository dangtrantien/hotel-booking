import { createSlice } from '@reduxjs/toolkit';

// ==================================================

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    items: [],
  },
  reducers: {
    // Lấy data thông qua action và thay thế state trong store
    replaceHotelState(state, action) {
      state.items = action.payload;
    },
  },
});

export const hotelActions = hotelSlice.actions;

export default hotelSlice.reducer;
