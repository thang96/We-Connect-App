import Loading from "@components/Loading";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
// Supports weights 100-900
import "@fontsource-variable/public-sans";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "@redux/slices/snackbarSlice";

const RootLayout = () => {
  const { message, open, type } = useSelector((state) => state.sbackbar);
  const dispatch = useDispatch();
  console.log(type);
  
  return (
    <>
      <div className="">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => {
            dispatch(closeSnackBar());
          }}
        >
          <Alert
            severity={type}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default RootLayout;
