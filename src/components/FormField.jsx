import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const FormField = ({ control, label, name, Component, type, error }) => {
  return (
    <div className="">
      <p className="text-dark-100 mb-1 text-sm font-bold">{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value = "", name } }) => {
          // Ensure value is always defined
          return (
            <Component
              onChange={onChange}
              value={value}
              name={name}
              control={control}
              type={type}
              error={error?.message}
            />
          );
        }}
      />
      {error?.message && (
        <FormHelperText error={true}>{error.message}</FormHelperText>
      )}
    </div>
  );
};

export default FormField;
