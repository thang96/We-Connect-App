import { rootApi } from "@services/rootApi";
import { logout } from "./slices/authSlice";
import { persistor } from "./store";

export const logoutMiddleware = (store) => {
  return (next) => {
    return (action) => {
      if (action.type === logout) {
        store.dispatch(rootApi.util.resetApiState());
        persistor.purge();
      }
      return next(action);
    };
  };
};
