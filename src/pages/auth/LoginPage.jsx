import FormField from "@components/FormField";
import TextInput from "@components/FormInput/TextInput";
import { Alert, Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openSnackBar } from "@redux/slices/snackbarSlice";

const LoginPage = () => {
  const [login, { data = [], isLoading, isError, error, isSuccess }] =
    useLoginMutation();
    
  const formSchema = object()
    .shape({
      email: string()
        .matches(
          /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
          "Địa chỉ email không đúng",
        )
        .required(),
      password: string().required("Password không được để trống"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formData) => {
    login(formData);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      dispatch(openSnackBar({ type: "error", message: error?.data?.message }));
    }

    if (isSuccess) {
      dispatch(openSnackBar({ message: data?.message }));
      navigate("/verify-otp", {
        state: {
          email: getValues("email"),
        },
      });
    }
  }, [data, dispatch, error, isError, isSuccess, navigate, getValues]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Login</p>
      <form
        className="flex flex-col gap-4"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          name={"email"}
          label={"Email"}
          control={control}
          Component={TextInput}
          error={errors.email}
          autoComplete="email" // Added autoComplete attribute
        />
        <FormField
          name={"password"}
          label={"Password"}
          control={control}
          Component={TextInput}
          type="password"
          error={errors.password}
          autoComplete="current-password" // Added autoComplete attribute
        />
        {isError && <Alert severity="error">{error?.data?.message}</Alert>}
        <Button variant="contained" type="submit">
          {isLoading ? (
            <CircularProgress size={"16px"} color="inherit" />
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
      <p className="mt-4">
        New on our platform?{" "}
        <Link to={"/register"} className="text-[15px] text-[#246AA3]">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
