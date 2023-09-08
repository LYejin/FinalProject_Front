import React, { useEffect, useState } from 'react';

const DeptSearchWrapper = ({ width }) => {
  const selectListWrapper = {
    position: 'relative',
    marginTop: '10px',
    minWidth: width,
    width: width,
    height: '80px',
    border: '2px solid lightgray',
    backgroundColor: '#f0f0f0',
  };

  return <div style={selectListWrapper}></div>;
};

export default DeptSearchWrapper;
