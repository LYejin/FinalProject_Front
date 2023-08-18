import React from "react";
import ButtonMUI from "@mui/material/Button";

const SubmitButton = ({ data, width, height }) => {
  return (
    <ButtonMUI
      type="submit"
      variant="contained"
      size="small"
      sx={{
        backgroundColor: "#3D4349",
        width: width,
        height: height,
        "&:hover": {
          backgroundColor: "#979797",
        },
      }}
    >
      {data}
    </ButtonMUI>
  );
};

export default SubmitButton;
