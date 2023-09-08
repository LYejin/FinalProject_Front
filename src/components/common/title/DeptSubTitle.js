import React from 'react';
import { Button, ButtonW } from '../Index';
import '../../../css/Title.css';
const DeptSubTitle = ({
  titleName,
  onClickInsert,
  onClickUpdate,
  isAdding,
  deleteDiv,
}) => {
  const onClick = () => {
    if (isAdding) {
      onClickInsert();
    } else {
      onClickUpdate();
    }
  };

  const onClick2 = () => {
    deleteDiv();
  };

  return (
    <div className="deptSubTitleWrapper">
      <div className="subTitleInfo">기본정보</div>
      <div className="subTitleInfo2">부서원 정보</div>
    </div>
  );
};

export default DeptSubTitle;
