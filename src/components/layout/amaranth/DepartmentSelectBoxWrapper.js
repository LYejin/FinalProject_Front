import React from 'react';

const DepartmentSelectBoxWrapper = ({ children }) => {
  return (
    <div
      className="deptSelectBoxWrapper"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#F3F7FA',
      }}
    >
      {children}
    </div>
  );
};

export default DepartmentSelectBoxWrapper;
