import React from 'react';

const MainContentWrapper = ({ children, state, height }) => {
  if (state === 0) {
    return <div className="deptContentWrapper">{children}</div>;
  } else {
    return (
      <div
        className="mainContentWrapper"
        style={{
          height: `calc(100% - ${height})`,
        }}
      >
        {children}
      </div>
    );
  }
};

export default MainContentWrapper;
