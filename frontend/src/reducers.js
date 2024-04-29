import { combineReducers } from 'redux';
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

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export const { loginSuccess } = authSlice.actions;
export default rootReducer;
