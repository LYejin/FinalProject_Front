import React from 'react';
import ButtonMUI from '@mui/material/Button';

const EventButton = ({ data, width, height, onClickEvent, classname }) => {
  const onClickEventFunction = () => {
    console.log('hiii');
    onClickEvent();
  };

  return (
    <ButtonMUI
      onClick={onClickEventFunction}
      variant="contained"
      size="small"
      class={classname}
    >
      {data}
    </ButtonMUI>
  );
};

export default EventButton;
