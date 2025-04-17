import React, { Children } from "react";
import Button from "@mui/material/Button";

function CustomButton({
  variant,
  type,
  onClick,
  size,
  sx = {},
  children,
  className,
  ...rest
}) {
  return (
    <>
      <Button
        variant={variant || "contained"}
        className={`${className} btn`}
        type={type || "button"}
        onClick={onClick}
        size={size || "medium"}
        sx={{
          fontWeight: "bold",
          fontSize: "15px",
          "&:hover": {
            backgroundColor: "rgb(198.64, 199.51, 203.98)",
            color: "rgb(61.04, 61.11, 80.78)",
          },
          ...sx,
          backgroundColor: sx.backgroundColor || "#4B4363",
          color: sx.color || "#FFFFFF",
        }}
        {...rest}
      >
        {children}
      </Button>
    </>
  );
}

export default CustomButton;
