import FormField from "@components/FormField";
import TextInput from "@components/FormInput/TextInput";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { control } = useForm();
  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Login</p>
      <form className="flex flex-col gap-4" action="">
        <FormField
          name={"emailOrUsername"}
          label={"Email or Username"}
          control={control}
          Component={TextInput}
        />
        <FormField
          name={"password"}
          label={"Password"}
          control={control}
          Component={TextInput}
          type="password"
        />
        <Button variant="contained">Sign in</Button>
      </form>
      <p className="mt-4">
        Noew on out platform?{" "}
        <Link to={"./register"} className="text-[15px] text-[#246AA3]">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
