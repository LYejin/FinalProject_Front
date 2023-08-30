import React from 'react';
import ButtonMUI from '@mui/material/Button';

const SubmitButton = ({ data, width, height, onClickEvent }) => {
  const onClickEventFunction = () => {
    console.log('hiii');
    onClickEvent();
  };
  return (
    <ButtonMUI
      type="button" // 버튼의 type을 'button'으로 변경하여 기본 폼 동작을 막습니다.
      variant="contained"
      size="small"
      class="WhiteButton" // 'class' 대신 'className'을 사용합니다.
      onClick={onClickEvent}
    >
      {data}
    </ButtonMUI>
  );
};

export default SubmitButton;
