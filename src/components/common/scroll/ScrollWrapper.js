import React from "react";

const ScrollWrapper = ({ width, children }) => {
  const scrollWrapper = {
    minWidth: width,
    height: `calc(100vh - 314px)`,
    overflowY: "scroll",
  };
  return <div style={scrollWrapper}>{children}</div>;
};

export default ScrollWrapper;
