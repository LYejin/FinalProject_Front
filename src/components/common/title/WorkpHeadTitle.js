import React from 'react';
import { Button, ButtonW } from '../Index';
const WorkpHeadTitle = ({ titleName, onClick }) => {
  return (
    <div className="detailTitleWrapper">
      <i class="fa-solid fa-circle"></i>
      {titleName}
      <div className="headTitleButton">
        <button onClick={onClick}>저장</button>
        <ButtonW data={'삭쮀'}></ButtonW>X
      </div>
    </div>
  );
};

export default WorkpHeadTitle;
