import React from 'react';

const WorkplaceListBoxItem = ({
  leftTop,
  rightTop,
  leftBottom,
  //fetchWorkplaceInfo,
  isAdding,
  setIsAdding,
  handleFetchWorkplaceInfo,
}) => {
  const onClickDetailWorkpInfo = async e => {
    e.preventDefault(); // 클릭 이벤트의 기본 동작 막음
    e.stopPropagation(); // 이벤트 전파 중지
    console.log('onClickDetailWorkpInfo 시작');
    if (isAdding) {
      console.log('isAdding true, setIsAdding(false)');
      setIsAdding(false);
    }
    console.log('handleFetchWorkplaceInfo 호출');
    handleFetchWorkplaceInfo(leftTop);
    console.log('onClickDetailWorkpInfo 종료');
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
