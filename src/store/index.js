import { configureStore } from '@reduxjs/toolkit';
import paketiReducer from '../store/paketi-slice';
import authReducer from '../store/auth-slice';

const store = configureStore({
  reducer: {
    paketi: paketiReducer,
    auth: authReducer,
  },
});

export default store;
