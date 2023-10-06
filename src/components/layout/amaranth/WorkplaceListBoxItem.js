import React from 'react';

const WorkplaceListBoxItem = ({
  leftTop,
  rightTop,
  leftBottom,
  isAdding,
  handleFetchWorkplaceInfo,
  selectedItemIndex,
  setSelectedItemIndex,
  index,
  serachButtonClick,
  rightBottom,
}) => {
  const isSelected = index === selectedItemIndex;

  const onClickDetailWorkpInfo = async () => {
    if (isAdding) {
      const userConfirmed = window.confirm(
        '작성중인 내용이 있습니다. 취소하시겠습니까?'
      );
      if (userConfirmed) {
        setSelectedItemIndex(index);
        handleFetchWorkplaceInfo(leftTop, rightTop);
        return;
      } else {
        return;
      }
    }
    setSelectedItemIndex(index);
    handleFetchWorkplaceInfo(leftTop, rightTop);
  };

  return (
    <div
      className={` ${isSelected ? 'selected' : 'listBoxItem'}`}
      onClick={() => {
        onClickDetailWorkpInfo();
      }}
    >
      <div className="flexWrapper">
        <span className="leftContent">{leftTop}</span>
        <span className="rightContent">{rightTop}</span>
      </div>
      <div className="flexWrapper">
        <span className="codeLeft">{leftBottom}</span>
        <span className="codeRighst">{rightBottom}</span>
      </div>
    </div>
  );
};

export default WorkplaceListBoxItem;
