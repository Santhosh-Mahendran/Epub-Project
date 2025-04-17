import React, { Children } from "react";
import Card from "@mui/material/Card";

function CardComponent({ width, children, height, style, className }) {
  return (
    <>
      <Card
        sx={{
          padding: style?.padding ? style?.padding : "20px",
          width: style?.width,
          height: style?.height,
        }}
        className={` ${className} shadow`}
      >
        {children}
      </Card>
    </>
  );
}

export default CardComponent;
