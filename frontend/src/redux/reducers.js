import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;

// Action asynchrone pour mettre à jour l'utilisateur
export const updateUserAsync = (newUserData) => async (dispatch) => {
  try {
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', newUserData, {
      headers: {
        Authorization: `Bearer ${newUserData.token}`
      }
    });
    dispatch(setUser(response.data.body)); 
  } catch (error) {
    console.error('Error updating user:', error);
  
  }
};

export default authSlice.reducer;
