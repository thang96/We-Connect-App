import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  maxWidth: "xs",
  fullWidth: true,
  title: null,
  contentType: null,
  additionalData: {},
  actions: null,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      return { ...state, ...action.payload, open: true };
    },
    closeDialog: () => {
      return initialState;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
