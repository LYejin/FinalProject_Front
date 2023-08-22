import React from 'react';
import { Button, ButtonW } from '../Index';
import '../../../css/Title.css';
const WorkpHeadTitle = ({
  titleName,
  onClickInsert,
  onClickUpdate,
  isAdding,
}) => {
  const onClick = () => {
    if (isAdding) {
      onClickInsert();
    } else {
      onClickUpdate();
    }
  };

  return (
    <div className="detailTitleWrapper">
      <i class="fa-solid fa-circle"></i>
      {titleName}
      <div className="headTitleButton">
        <button className="WhiteButton" onClick={onClick}>
          저장
        </button>
        <button className="WhiteButton">삭제</button>X
      </div>
    </div>
  );
};

export default WorkpHeadTitle;
