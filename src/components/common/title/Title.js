import React from "react";

const Title = ({ titleName, children }) => {
  return (
    <div className="titleWrapper">
      <div className="titleName">{titleName}</div>
      {children}
    </div>
  );
};

export default Title;
