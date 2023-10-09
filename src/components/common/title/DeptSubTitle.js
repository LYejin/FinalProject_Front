import React from 'react';
import { Button, ButtonW } from '../Index';
import '../../../css/Title.css';
const DeptSubTitle = ({
  titleName,
  onClickInsert,
  onClickUpdate,
  isAdding,
  deleteDiv,
  children,
  margin,
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
    <div className="deptSubTitleWrapper" style={{ marginTop: margin }}>
      {children}
    </div>
  );
};

export default DeptSubTitle;
