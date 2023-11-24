import { createSlice } from '@reduxjs/toolkit';

// ==================================================

const IntialRoomState = {
  title: '',
  roomNumbers: [],
  maxPeople: 0,
  desc: '',
  price: 0,
  hotelId: '',
};

const roomSlice = createSlice({
  name: 'room',
  initialState: IntialRoomState,
  reducers: {
    replaceRoomState(state, action) {
      Object.keys(state).map((key) => {
        if (action.payload.name === key) {
          state[key] = action.payload.value;
        }

        return null;
      });
    },
    // Cài lại value
    addNewRoom(state) {
      Object.keys(state).map((key) => (state[key] = IntialRoomState[key]));
    },
  },
});

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
