// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ModalProvider from "@context/ModalProvider";
import RootLayout from "@pages/RootLayout";
import HomePage from "@pages/HomePage";
import { ThemeProvider } from "@emotion/react";
import theme from "./config/muiConfig";
import RegisterPage from "@pages/auth/RegisterPage";
import AuthLayout from "@pages/auth/AuthLayout";
import LoginPage from "@pages/auth/LoginPage";
import OTPVerifyPage from "@pages/auth/OTPVerifyPage";
import { Provider } from "react-redux";
import { store } from "@redux/store";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        children: [
          {
            path: "/",
            element: <HomePage />,
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ThemeProvider>
  </Provider>,
  // </StrictMode>,
);
