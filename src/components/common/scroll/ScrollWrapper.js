import React from "react";

const ScrollWrapper = ({ width, height, children }) => {
  const scrollWrapper = {
    minWidth: width,
    height: `calc(${height} - 30px)`,
    overflowY: "scroll",
    //border: "1px solid blue",
  };
  return <div style={scrollWrapper}>{children}</div>;
};

export default ScrollWrapper;
