import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.user = user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    register(state, action) {
        const user = action.payload;
        state.user = user;
        state.isAuthenticated = true;
      },
  },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;
