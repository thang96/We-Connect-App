import { logout } from "./slices/authSlice";
import { persistor } from "./store";

export const logoutMiddleware = () => {
  return (next) => {
    return (action) => {
      if (action.type === logout) {
        persistor.purge();
      }
      return next(action);
    };
  };
};
