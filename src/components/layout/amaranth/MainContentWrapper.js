import React from 'react';

const MainContentWrapper = ({ children, state }) => {
  if (state === 0) {
    return <div className="deptContentWrapper">{children}</div>;
  } else {
    return <div className="mainContentWrapper">{children}</div>;
  }
};

export default MainContentWrapper;
