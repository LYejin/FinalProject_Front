import React from 'react';

const SelectBoxWrapper = ({ children }) => {
  return (
    <div
      className="selectBoxWrapper"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
    >
      {children}
    </div>
  );
};

export default SelectBoxWrapper;
