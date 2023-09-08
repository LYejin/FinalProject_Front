import React, { useEffect, useState } from 'react';
import ListBoxItem from './ListBoxItem';
import axios from '../../../../node_modules/axios/index';
import { WorkplaceListBoxItem } from './Index';

const DeptShowWrapper = ({
  width,
  title,
  dataCount,
  data,
  FetchWorkplaceDetailInfo,
  handleAddClick,
  isAdding,
}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  useEffect(() => {
    setSelectedItemIndex(0);
  }, []);

  const selectListWrapper = {
    position: 'relative',
    minWidth: width,
    width: width,
    height: '100%',
  };

  const resetSelectedItemIndex = () => {
    setSelectedItemIndex(-1);
  };

  return (
    <div style={selectListWrapper}>
      <div className="deptListBoxHeader">
        <span className="deptListBoxtitle">· {title}</span>
        <span className="deptListBoxSort">필터</span>
      </div>
      <div className="deptListWrapper"></div>
    </div>
  );
};

export default DeptShowWrapper;
