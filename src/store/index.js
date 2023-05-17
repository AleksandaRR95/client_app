import { configureStore } from '@reduxjs/toolkit';
import paketiReducer from '../store/paketi-slice';

const store = configureStore({
  reducer: {
    paketi: paketiReducer,
  },
});

export default store;
