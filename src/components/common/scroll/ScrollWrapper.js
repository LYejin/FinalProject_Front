import React from "react";

const ScrollWrapper = ({ width, height, children }) => {
  const scrollWrapper = {
    minWidth: width,
    height: `calc(${height} - 30px)`,
    overflowY: "scroll",
  };
  return <div style={scrollWrapper}>{children}</div>;
};

export default ScrollWrapper;
