import React from "react";

const TextFieldBox = ({ width }) => {
  const TextFieldBoxWrapper = {
    height: "23px",
    width: width,
    fontSize: "0.8rem",
  };

  return <input style={TextFieldBoxWrapper} />;
};

export default TextFieldBox;
