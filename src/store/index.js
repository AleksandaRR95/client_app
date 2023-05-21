import { configureStore } from '@reduxjs/toolkit';
import paketiReducer from '../store/paketi-slice';
import authReducer from '../store/auth-slice';
import errorReducer from '../store/error-slice';

const store = configureStore({
  reducer: {
    paketi: paketiReducer,
    auth: authReducer,
    error: errorReducer
  },
});

export default store;
