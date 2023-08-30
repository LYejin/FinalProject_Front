import React from 'react';
import ButtonMUI from '@mui/material/Button';

const EventButton = ({ data, width, height, onClickEvent }) => {
  const onClickEventFunction = () => {
    console.log('hiii');
    onClickEvent();
  };

  return (
    <ButtonMUI
      onClick={onClickEventFunction}
      variant="contained"
      size="small"
      sx={{
        backgroundColor: '#3D4349',
        width: width,
        height: height,
        '&:hover': {
          backgroundColor: '#979797',
        },
      }}
    >
      {data}
    </ButtonMUI>
  );
};

export default EventButton;
