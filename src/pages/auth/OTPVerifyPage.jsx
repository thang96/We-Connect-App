import FormField from "@components/FormField";
import OTPInput from "@components/FormInput/OTPInput";
import { Button } from "@mui/material";
import { login } from "@redux/slices/authSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const OTPVerifyPage = () => {
  const { control } = useForm();
  const dispatch = useDispatch();
  
 

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">
        Two-Step Verification 💬
      </p>
      <form className="flex flex-col gap-4" action="">
        <FormField
          name={"otp"}
          label={"Type your 6 digit security code"}
          control={control}
          Component={OTPInput}
        />

        <Button variant="contained">Verify my account</Button>
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
