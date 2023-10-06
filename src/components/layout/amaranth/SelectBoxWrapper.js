import React from 'react';

const SelectBoxWrapper = ({ children, height, width, className, padding }) => {
  return (
    <div
      className={'selectBoxWrapper'}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        height: height,
        minWidth: width,
        paddingLeft: padding,
      }}
    >
      {children}
    </div>
  );
};

export default SelectBoxWrapper;
