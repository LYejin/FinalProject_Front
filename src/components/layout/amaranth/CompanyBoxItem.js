import React from "react";

const CompanyBoxItem = ({ leftTop, rightTop, leftBottom, rightBotton, clickEmp}) => {

  const handleItemClick = () => {
    clickEmp(leftTop);
  };
  
  

  return (
    <div className="listBoxItem" onClick={handleItemClick}>
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
