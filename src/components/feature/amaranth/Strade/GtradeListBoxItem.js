import React, { useEffect, useState } from 'react';

const GtradeListBoxItem = ({
  leftTop,
  rightTop,
  leftBottom,
  clickBoxEvent,
  checkItemHandler,
  isAllChecked,
  clickedBoxID,
}) => {
  const [checked, setChecked] = useState(false); // 하나씩에 대한 체크 여부 판단

  const allCheckHandler = () => setChecked(isAllChecked);
  useEffect(() => allCheckHandler(), [isAllChecked]);

  const onClickDetailEmpInfo = () => {
    clickBoxEvent(leftTop);
  };

  const checkHandled = ({ target }) => {
    setChecked(!checked);
    checkItemHandler(target.id, target.checked);
  };

  const gtradeListBoxItemCSS = {
    width: 'calc(100% - 26px)',
    height: '65px',
    backgroundColor: clickedBoxID === leftTop ? '#e6f5ff' : 'white',
    border:
      clickedBoxID === leftTop ? '1px solid #4aa1f2' : '1px solid #dfdfdf',
    marginBottom: '7px',
    padding: '25px 6%',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#e6f5ff',
      border: '1px solid #4aa1f2',
    },
  };

  return (
    <div style={gtradeListBoxItemCSS} onClick={onClickDetailEmpInfo}>
      <div>
        <input
          id={leftTop}
          type="checkbox"
          style={{ borderRadius: '0' }}
          checked={checked}
          onClick={e => e.stopPropagation()}
          onChange={e => checkHandled(e)}
        />
      </div>
      <div className="bottomGtradeListWrapper">
        <div className="flexWrapper gtradeLineFix">
          <span className="leftContent">{leftTop}</span>
          <span className="rightContent">{rightTop}</span>
        </div>
        <div className="flexWrapper">
          <span className="code">{leftBottom}</span>
        </div>
      </div>
    </div>
  );
};

export default GtradeListBoxItem;
