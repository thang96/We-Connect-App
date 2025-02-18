import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  maxWidth: "xs",
  fullWidth: true,
  title: "",
  contentType: null,
  actions: null,
  addtionalData:{}
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: initialState,
  reducers: {
    openDialog: (state, action) => {
      return { ...state, ...action.payload,};
    },
    closeDialog: () => {
      return initialState;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
