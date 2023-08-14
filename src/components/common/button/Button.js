import React from "react";
import ButtonMUI from "@mui/material/Button";

const Button = ({ data }) => {
  return (
    <ButtonMUI
      variant="contained"
      size="small"
      sx={{
        backgroundColor: "#3D4349",
        "&:hover": {
          backgroundColor: "#979797",
        },
      }}
    >
      {data}
    </ButtonMUI>
  );
};

export default Button;
