import React from 'react';

const GtradeListBoxItem = ({
  leftTop,
  rightTop,
  leftBottom,
  clickBoxEvent,
  //clickedBoxID,
}) => {
  const onClickDetailEmpInfo = () => {
    clickBoxEvent(leftTop);
  };

  const empListBoxItemCSS = {
    width: 'calc(100% - 26px)',
    height: '77px',
    //backgroundColor: clickedBoxID === leftTop ? '#e6f5ff' : 'white',
    // border:
    //   clickedBoxID === leftTop ? '1px solid #4aa1f2' : '1px solid #dfdfdf',
    marginBottom: '7px',
    padding: '20px 6%',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#e6f5ff',
      border: '1px solid #4aa1f2',
    },
  };

  return (
    <div style={empListBoxItemCSS} onClick={onClickDetailEmpInfo}>
      <div className="flexWrapper">
        <span className="leftContent">{leftTop}</span>
        <span className="rightContent">{rightTop}</span>
      </div>
      <div className="flexWrapper">
        <span className="code">{leftBottom}</span>
      </div>
    </div>
  );
};

export default GtradeListBoxItem;
