import React from 'react';

const ScrollWrapper = ({ width, children, deptH }) => {
  const scrollWrapper = {
    minWidth: width,
    height: `calc(100vh - ${314 + deptH}px)`,
    overflowY: 'scroll',
    overflowX: 'hidden',
  };

  return <div style={scrollWrapper}>{children}</div>;
};

ScrollWrapper.defaultProps = {
  deptH: 0, // deptH가 주어지지 않았을 때 기본값으로 0 사용
};

export default ScrollWrapper;
