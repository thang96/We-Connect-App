import FormField from "@components/FormField";
import TextInput from "@components/FormInput/TextInput";
import { Alert, Button } from "@mui/material";
import { openSnackBar } from "@redux/slices/snackbarSlice";
import { useRegisterMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [register, { data = {}, isLoading, isError, error, isSuccess }] =
    useRegisterMutation();
  const formSchema = object()
    .shape({
      fullName: string().required("Full Name không được để trống"),
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
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  // console.log(errors);

  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    register(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(openSnackBar({ message: data?.message }));
      navigate("/login");
    }
  }, [data, dispatch, isSuccess, navigate]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Register</p>
      <form
        className="flex flex-col gap-4"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          name={"fullName"}
          label={"Full Name"}
          control={control}
          Component={TextInput}
          value=""
          error={errors.fullName}
        />
        <FormField
          name={"email"}
          label={"Email"}
          control={control}
          Component={TextInput}
          value=""
          error={errors.email}
        />
        <FormField
          name={"password"}
          label={"Password"}
          control={control}
          Component={TextInput}
          type="password"
          value=""
          error={errors.password}
        />
        <Button disabled={isLoading} type="submit" variant="contained">
          Sign up
        </Button>
        {isError && <Alert severity="error">{error.data.message}</Alert>}
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to={"/login"} className="text-[15px] text-[#246AA3]">
          Sign in instead
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
