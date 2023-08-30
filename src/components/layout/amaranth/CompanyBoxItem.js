import React from 'react';

const CompanyBoxItem = ({
  leftTop,
  rightTop,
  leftBottom,
  rightBotton,
  clickEmp,
}) => {
  const focusElement = React.useRef();
  const handleItemClick = () => {
    clickEmp(leftTop, focusElement);
  };

  //const handleItemChange = () => {};

  return (
    <div className="listBoxItem" ref={focusElement} onClick={handleItemClick}>
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
