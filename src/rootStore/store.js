import { combineReducers, configureStore } from '@reduxjs/toolkit';
import walletReducer from '../shared/components/store/reducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const rootReducer = combineReducers({
  wallet: walletReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loader', 'error'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const { dispatch } = store;

export const persistor = persistStore(store);

export default store;
