import React from 'react';
import { Title } from '../Index';

const FilterBox = ({ width, height, onClose, isOpen }) => {
  const FilterBox = {
    width: width,
    height: height,
    backgroundColor: 'red',
    zIndex: 20000,
    display: isOpen ? 'block' : 'none',
  };

  const closeButtonStyle = {
    position: 'absolute',
    right: '10px',
    top: '5px',
    fontSize: '20px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    marginTop: '25px',
    marginRight: '13px',
  };

  return (
    <>
      <div style={FilterBox}>
        <button style={closeButtonStyle} onClick={onClose}>
          X
        </button>
        <div>사용여부</div>
        <div>전체</div>
        <div>사용부서</div>
        <div>조직도표시</div>
        <div>전체</div>
        <div>조직도표시</div>
      </div>
      <div onClick={onClose}></div>
    </>
  );
};

export default FilterBox;
