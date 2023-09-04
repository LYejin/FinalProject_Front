import React from 'react';

const ScrollWrapper = ({ width, children }) => {
  const scrollWrapper = {
    minWidth: width,
    height: `calc(100vh - 314px)`,
    overflowY: 'scroll',
    //border: "1px solid blue",
  };
  return <div style={scrollWrapper}>{children}</div>;
};

export default ScrollWrapper;
