import React from 'react';

const ModalBoxWrapper = ({ children, width }) => {
  return (
    <div
      className="modalBoxWrapper"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '100px',
      }}
    >
      {children}
    </div>
  );
};

export default ModalBoxWrapper;
