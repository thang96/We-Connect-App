import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: null,
  type: "success",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialState,
  reducers: {
    openSnackBar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeSnackBar: () => {
      return initialState;
    },
  },
});

export const { openSnackBar, closeSnackBar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
