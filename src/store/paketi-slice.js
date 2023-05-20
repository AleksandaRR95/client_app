import { createSlice } from '@reduxjs/toolkit';

const paketiSlice = createSlice({
  name: 'paketi',
  initialState: [],
  reducers: {
    addPaket: (state, action) => {
      state.push(action.payload);
    },
    deletePaket:(state, action) =>{
      const paketId = action.payload;
      const updatedPaketi = state.filter((paket) => paket.id !== paketId);
      return updatedPaketi;
    },
    updatePaket: (state, action) => {
      const updatedPaket = action.payload;
      const index = state.findIndex((paket) => paket.id === updatedPaket.id);
      if (index !== -1) {
        state[index] = updatedPaket;
      }
    }
  },
});

export const { addPaket, deletePaket } = paketiSlice.actions;


export default paketiSlice.reducer;
