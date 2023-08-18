import React from "react";

const ListBoxItem = ({ leftTop, rightTop, leftBottom, clickBoxEvent }) => {
  const onClickDetailEmpInfo = () => {
    console.log(leftTop, leftBottom);
    clickBoxEvent(leftBottom, leftTop);
  };

  return (
    <div className="listBoxItem" onClick={onClickDetailEmpInfo}>
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

export default ListBoxItem;
