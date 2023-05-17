import { createSlice } from '@reduxjs/toolkit';

const paketiSlice = createSlice({
  name: 'paketi',
  initialState: [],
  reducers: {
    addPaket: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addPaket } = paketiSlice.actions;

export default paketiSlice.reducer;
