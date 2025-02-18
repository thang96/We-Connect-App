import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "@redux/slices/authSlice";
import { rootApi } from "@services/rootApi";
import snackbarReducer from "@redux/slices/snackbarSlice";
import settingsReducer from "@redux/slices/settingsSlice";
import dialogReducer from "@redux/slices/dialogSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { logoutMiddleware } from "./middlewares";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    rootApi.reducerPath,
    // dialogReducer.reducerPath,
    // settingsReducer.reducerPath,
    'settings',
    'dialog'
  ],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authSlice,
    sbackbar: snackbarReducer,
    settings: settingsReducer,
    dialog: dialogReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logoutMiddleware, rootApi.middleware);
  },
});

export const persistor = persistStore(store);
