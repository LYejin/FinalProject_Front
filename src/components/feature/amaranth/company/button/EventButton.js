import React from 'react';
import ButtonMUI from '@mui/material/Button';

const EditButton = ({ data, width, height, onClickEvent }) => {
  const onClickEventFunction = () => {
    console.log('hiii');
    onClickEvent();
  };

  return (
    <ButtonMUI
      onClick={onClickEventFunction}
      variant="contained"
      size="small"
      class="comWhiteButton"
    >
      {data}
    </ButtonMUI>
  );
};

export default EditButton;
