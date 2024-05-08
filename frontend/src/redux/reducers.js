import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import axios from 'axios';

// Création d'un slice pour l'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    // Action pour la connexion réussie
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
     // Action pour définir le profil utilisateur
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;

// Action asynchrone pour mettre à jour le profil utilisateur
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

// Configuration de la persistance des données pour le slice auth
const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'], 
};
const persistedAuthSlice = persistReducer(persistConfig, authSlice.reducer);

export default persistedAuthSlice;
