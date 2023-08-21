import React from 'react';

const WorkplaceListBoxItem = ({
  leftTop,
  rightTop,
  leftBottom,
  fetchWorkplaceInfo,
  handleFetchWorkplaceInfo,
}) => {
  const onClickDetailWorkpInfo = async () => {
    fetchWorkplaceInfo(leftTop);
    handleFetchWorkplaceInfo(leftTop);
  };

  return (
    <div className="listBoxItem" onClick={onClickDetailWorkpInfo}>
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

export default WorkplaceListBoxItem;
