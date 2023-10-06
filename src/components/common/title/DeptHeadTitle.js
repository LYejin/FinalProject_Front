import React from 'react';
import { Button, ButtonW } from '../Index';
import '../../../css/Title.css';
const DeptHeadTitle = ({
  data,
  titleName,
  onClickInsert,
  onClickUpdate,
  isAdding,
  deleteDiv,
  clickInsertBoxEvent,
  selectedDivCd,
  useCoCd,
  setVisible,
  onSave,
  formRef,
  setIsUpdate,
  isUpdate,
  checkDeleteDept,
}) => {
  const onClick = () => {
    if (isAdding) {
      onClickInsert();
    } else {
      onClickUpdate();
    }
  };

  const onClick2 = () => {
    checkDeleteDept();
  };

  const onClickInsertDept = e => {
    console.log('boxclick');
    clickInsertBoxEvent();
    setVisible(true);
    setIsUpdate(true);
  };

  const onSaveClick = () => {
    if (onSave) {
      onSave(); // handleSubmit 함수를 직접 호출합니다.
    }
  };
  return (
    <div className="deptDetailTitleWrapper">
      <i className="fa-solid fa-circle"></i>
      {titleName}
      <div className="headTitleButton">
        {selectedDivCd && useCoCd && (
          <button className="NewBlueButton" onClick={onClickInsertDept}>
            {isUpdate ? '초기화' : '부서 추가'}
          </button>
        )}
        <button className="WhiteButton" onClick={onSaveClick}>
          저장
        </button>
        <button className="WhiteButton" onClick={onClick2}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default DeptHeadTitle;
