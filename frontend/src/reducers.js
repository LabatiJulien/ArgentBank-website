import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
