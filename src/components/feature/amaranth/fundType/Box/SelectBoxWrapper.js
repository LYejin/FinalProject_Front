import React from 'react';

const FundTypeSelectBoxWrapper = ({ children, height, width, className }) => {
  return (
    <div
      className={'searchModalselectBoxWrapper'}
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

export default FundTypeSelectBoxWrapper;
