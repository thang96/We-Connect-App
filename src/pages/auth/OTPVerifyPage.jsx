import FormField from "@components/FormField";
import OTPInput from "@components/FormInput/OTPInput";
import { Button, CircularProgress } from "@mui/material";
import { login } from "@redux/slices/authSlice";
import { openSnackBar } from "@redux/slices/snackbarSlice";
import { useVerifyOTPMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OTPVerifyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifyOTP, { data, isLoading, isError, error, isSuccess }] =
    useVerifyOTPMutation();
  const { control, handleSubmit } = useForm({
    otp: "",
  });
  const location = useLocation();

  const onSubmit = (formData) => {
    verifyOTP({ email: location?.state?.email, otp: formData.otp });
  };
  const token = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      dispatch(openSnackBar({ type: "error", message: error?.data?.message }));
    }

    if (isSuccess) {
      dispatch(login(data));
      if (token.accessToken) {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isError, isSuccess, token]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">
        Two-Step Verification 💬
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        action=""
      >
        <FormField
          name={"otp"}
          label={"Type your 6 digit security code"}
          control={control}
          Component={OTPInput}
        />

        <Button type="submit" variant="contained">
          {isLoading ? (
            <CircularProgress size={"16px"} color="white" />
          ) : (
            "Verify my account"
          )}
        </Button>
      </form>
      <p className="mt-4">
        Did&apos;t get the code?{" "}
        <Link to={"./login"} className="text-[15px] text-[#246AA3]">
          Resend
        </Link>
      </p>
    </div>
  );
};

export default OTPVerifyPage;
