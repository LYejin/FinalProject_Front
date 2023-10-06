import React from 'react';

const SelectListWrapperCommon = ({
  width,
  title,
  dataCount,
  data,
  clickInsertBoxEvent,
  clickedBoxID,
  listRef,
  children,
  checkTotalList,
  allCheckedHandler,
}) => {
  const selectListWrapper = {
    position: 'relative',
    minWidth: width,
    height: '100%',
    border: '1px solid #ebebeb',
  };

  const onClickInsertEmp = e => {
    console.log('boxclick');
    clickInsertBoxEvent(data);
  };

  return (
    <div style={selectListWrapper}>
      <div className="listBoxHeader">
        {checkTotalList && (
          <input
            type="checkbox"
            className="listBoxTotalCheckBox"
            onChange={e => allCheckedHandler(e)}
          />
        )}
        <span className="listBoxtitle">{title}</span>
        <span className="listBoxDataCount">{dataCount}</span>건
        <span className="listBoxSort">정렬순</span>
      </div>
      <div className="listWrapper" ref={listRef}>
        {children}
      </div>
      <div className="footerBox" onClick={onClickInsertEmp}>
        <i className="fa-solid fa-circle-plus"></i>추가
      </div>
    </div>
  );
};

export default SelectListWrapperCommon;
