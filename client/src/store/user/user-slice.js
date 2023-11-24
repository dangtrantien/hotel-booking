import { createSlice } from '@reduxjs/toolkit';

// ==================================================

const InitialUserState = {
  _id: '',
  username: '',
  email: '',
  password: '',
  fullName: '',
  phoneNumber: '',
  cardNumber: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: InitialUserState,
  reducers: {
    // Lấy data thông qua action và thay thế state trong store
    replaceUserState(state, action) {
      Object.keys(state).map((key) => {
        if (action.payload.name === key) {
          state[key] = action.payload.value;
        }

        return null;
      });
    },
    logOut(state) {
      sessionStorage.removeItem('token');

      Object.keys(state).map((key) => (state[key] = ''));
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
