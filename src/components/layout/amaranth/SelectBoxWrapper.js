import React from 'react';

const SelectBoxWrapper = ({ children, width }) => {
  return (
    <div
      className="selectBoxWrapper"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '100px',
        width: '300px',
      }}
    >
      {children}
    </div>
  );
};

export default SelectBoxWrapper;
