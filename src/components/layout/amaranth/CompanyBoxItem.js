import React from 'react';
import { useRef, useEffect } from 'react';

const CompanyBoxItem = ({
  leftTop,
  rightTop,
  leftBottom,
  rightBotton,
  clickEmp,
  clickedBoxID,
  setClickedBoxID,
}) => {
  const focusElement = React.useRef();

  const handleItemClick = () => {
    setClickedBoxID(leftTop);
    clickEmp(leftTop, focusElement);
  };
  const empListBoxItemCSS = {
    width: 'calc(100% - 26px)',
    height: '77px',
    backgroundColor: clickedBoxID === leftTop ? '#e6f5ff' : 'white',
    border:
      clickedBoxID === leftTop ? '1px solid #4aa1f2' : '1px solid #dfdfdf',
    marginBottom: '7px',
    padding: '17px 6%',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#e6f5ff',
      border: '1px solid #4aa1f2',
    },
  };

  //const handleItemChange = () => {};

  return (
    <div
      className="listBoxItem"
      style={empListBoxItemCSS}
      ref={focusElement}
      onClick={handleItemClick}
    >
      <div className="flexWrapper">
        <span className="leftContent">{leftTop}</span>
        <span className="rightContent">{rightTop}</span>
      </div>
      <div className="flexWrapper">
        <span className="code">{leftBottom}</span>
        <span className="rightContent">{rightBotton}</span>
      </div>
    </div>
  );
};

export default CompanyBoxItem;
