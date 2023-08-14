import React from "react";

const ListBoxItem = ({ leftTop, rightTop, leftBottom }) => {
  return (
    <div className="listBoxItem">
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
