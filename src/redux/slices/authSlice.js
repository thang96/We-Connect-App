import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  useInfo: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: () => {
      return initialState;
    },
    saveUseInfo: (state, action) => {
      state.useInfo = action.payload;
    },
  },
});

export const { login, logout, saveUseInfo } = authSlice.actions;
export default authSlice.reducer;
