import React from 'react';
import EmpListBoxItem from './EmpListBoxItem';

const EmpSelectListWrapper = ({
  width,
  title,
  dataCount,
  data,
  clickBoxEvent,
  clickInsertBoxEvent,
  clickedBoxID,
  listRef,
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
        <span className="listBoxtitle">{title}</span>
        <span className="listBoxDataCount">{dataCount}</span>건
        <span className="listBoxSort">정렬순</span>
      </div>
      <div className="listWrapper" ref={listRef}>
        {data.map(info => (
          <EmpListBoxItem
            key={info.username}
            clickedBoxID={clickedBoxID}
            leftTop={info.username}
            rightTop={info.join_DT || '5555'}
            leftBottom={info.kor_NM}
            clickBoxEvent={clickBoxEvent}
          />
        ))}
      </div>
      <div className="footerBox" onClick={onClickInsertEmp}>
        <i className="fa-solid fa-circle-plus"></i>사원추가
      </div>
    </div>
  );
};

export default EmpSelectListWrapper;
