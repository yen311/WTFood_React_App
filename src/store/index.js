import { configureStore } from '@reduxjs/toolkit';
import formValidSlice from './formValid-action';
import restaurantAction from './restaurantAction';
import authAction from './authAction';

const store = configureStore({
  reducer: {
    formValid: formValidSlice.reducer,
    restaurants: restaurantAction.reducer,
    auth: authAction.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
