import React from 'react';

const WorkpSelectBoxWrapper = ({ children }) => {
  return (
    <div
      className="selectBoxWrapper"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '100px',
        minWidth: '1230px',
      }}
    >
      <div
        style={{
          flex: '1',
          display: 'flex',
          gap: '100px',
          alignItems: 'center',
        }}
      >
        {children.slice(0, children.length - 1)}
      </div>
      <div
        style={{
          marginRight: '10px',
        }}
      >
        {children[children.length - 1]}
      </div>
    </div>
  );
};

export default WorkpSelectBoxWrapper;
