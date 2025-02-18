// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ModalProvider from "@context/ModalProvider";
import RootLayout from "@pages/RootLayout";
import HomePage from "@pages/HomePage";
import { ThemeProvider } from "@emotion/react";
import theme from "./config/muiConfig";
import RegisterPage from "@pages/auth/RegisterPage";
import AuthLayout from "@pages/auth/AuthLayout";
import LoginPage from "@pages/auth/LoginPage";
import OTPVerifyPage from "@pages/auth/OTPVerifyPage";
import { Provider } from "react-redux";
import { persistor, store } from "@redux/store";
import ProtectedLayout from "@pages/ProtectedLayout";
import MessagePage from "@pages/MessagePage";
import { PersistGate } from "redux-persist/integration/react";
import Dialog from "@components/Dialog";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/message",
            element: <MessagePage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/verify-otp",
            element: <OTPVerifyPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <ThemeProvider theme={theme}>
        {/* <ModalProvider> */}
          <RouterProvider router={router} />
          <Dialog/>
        {/* </ModalProvider> */}
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  // </StrictMode>,
);
