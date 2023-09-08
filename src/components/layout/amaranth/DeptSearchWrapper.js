import React, { useEffect, useState } from 'react';

const DeptSearchWrapper = ({ width, children }) => {
  const selectListWrapper = {
    position: 'relative',
    marginTop: '10px',
    minWidth: width,
    width: width,
    height: '90px',
    border: '2px solid lightgray',
    backgroundColor: '#f0f0f0',
    paddingTop: '5px',
  };

  return <div style={selectListWrapper}>{children}</div>;
};

export default DeptSearchWrapper;
