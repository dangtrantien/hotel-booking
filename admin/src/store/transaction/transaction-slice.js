import { createSlice } from '@reduxjs/toolkit';

// ==================================================

const IntialTransactionState = {
  user: '',
  hotel: '',
  room: [],
  dateStart: '',
  dateEnd: '',
  price: 0,
  payment: '',
  status: '',
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: IntialTransactionState,
  reducers: {
    replaceTransactionState(state, action) {
      Object.keys(state).map((key) => {
        if (action.payload.name === key) {
          state[key] = action.payload.value;
        }

        return null;
      });
    },
  },
});

export const transactionActions = transactionSlice.actions;

export default transactionSlice.reducer;
