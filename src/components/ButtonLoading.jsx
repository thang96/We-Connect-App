import { Button, CircularProgress } from "@mui/material";

const ButtonLoading = ({
  isLoading = false,
  icon,
  onClick,
  variant = "outlined",
  title,
  size,
  disabled,
}) => {
  return (
    <Button
      disabled={disabled}
      variant={variant}
      onClick={onClick}
      size={size}
      className=""
    >
      {isLoading ? (
        <CircularProgress className="mr-1 animate-spin" size={"16px"} />
      ) : (
        icon
      )}{" "}
      {title}
    </Button>
  );
};

export default ButtonLoading;
