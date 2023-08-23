import React, { useEffect, useState } from 'react';
import ListBoxItem from './ListBoxItem';
import axios from '../../../../node_modules/axios/index';
import { WorkplaceListBoxItem } from './Index';

const SelectWorkplaceListWrapper = ({
  width,
  title,
  dataCount,
  data,
  FetchWorkplaceDetailInfo,
  handleAddClick,
  isAdding,
}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  const selectListWrapper = {
    position: 'relative',
    width: width,
    height: '100%',
    border: '1px solid #ebebeb',
  };

  const resetSelectedItemIndex = () => {
    setSelectedItemIndex(-1); // 모든 아이템의 선택 상태를 초기화합니다.
  };

  return (
    <div style={selectListWrapper}>
      <div className="listBoxHeader">
        <span className="listBoxtitle">{title}</span>
        <span className="listBoxDataCount">{dataCount}</span>건
        <span className="listBoxSort">정렬순</span>
      </div>
      <div className="listWrapper">
        {data.map((data, index) => (
          <WorkplaceListBoxItem
            key={data.div_CD}
            leftTop={data.div_CD}
            rightTop={data.co_CD}
            leftBottom={data.div_NM}
            isAdding={isAdding}
            handleFetchWorkplaceInfo={FetchWorkplaceDetailInfo}
            selectedItemIndex={selectedItemIndex}
            setSelectedItemIndex={setSelectedItemIndex}
            index={index} // 아이템의 인덱스를 전달합니다.
          />
        ))}
      </div>
      <div
        className="footerBox"
        onClick={() => {
          handleAddClick();
          resetSelectedItemIndex(); // 추가 버튼을 누르면 선택 상태를 초기화합니다.
        }}
      >
        <i className="fa-solid fa-circle-plus"></i>추가
      </div>
    </div>
  );
};

export default SelectWorkplaceListWrapper;
