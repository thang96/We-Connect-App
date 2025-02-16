import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@redux/slices/authSlice";
import { rootApi } from "@services/rootApi";
import snackbarReducer from "@redux/slices/snackbarSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    sbackbar: snackbarReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(rootApi.middleware);
  },
});
