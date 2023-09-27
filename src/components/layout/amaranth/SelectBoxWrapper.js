import React from 'react';

const SelectBoxWrapper = ({ children, height, width, className }) => {
  return (
    <div
      className={'selectBoxWrapper'}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        height: height,
        minWidth: width,
      }}
    >
      {children}
    </div>
  );
};

export default SelectBoxWrapper;
