import { configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers'; 

// Combinaison des reducers
const rootReducer = combineReducers({
  auth: reducers, // Reducer pour l'authentification
});
// Configuration de la persistance des données du store
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Seuls les états authentification sont persistés
};

// Création du reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuration et création du store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PAUSE", "persist/PURGE", "persist/REGISTER", "persist/FLUSH"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
