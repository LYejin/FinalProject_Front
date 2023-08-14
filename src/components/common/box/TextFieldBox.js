import React from "react";
import { TextField } from "../../../../node_modules/@mui/material/index";

const TextFieldBox = ({ width }) => {
  return (
    <TextField
      inputProps={{
        style: {
          height: "10px",
          width: width,
          fontSize: "0.8rem",
        },
      }}
      size="small"
    />
  );
};

export default TextFieldBox;
