import React from 'react';
import ButtonMUI from '@mui/material/Button';

const WhiteButton = ({ data, width, height, onClickEvent }) => {
  const onClickEventFunction = () => {
    onClickEvent();
  };

  return (
    <ButtonMUI
      onClick={onClickEventFunction}
      variant="contained"
      size="small"
      sx={{
        width: '-20px',
        backgroundImage: 'linear-gradient(#f9f9f9, #eaeaea)',
        border: '1px solid lightgray',
        borderRadius: '3px',
        fontSize: '13px',
        fontWeight: 'bold',
        color: 'darkgray',
        transition: 'border-color 0.3s',
        verticalAlign: 'middle',
        boxShadow: 'none',
        height: '30px',
        marginLeft: 'auto',
      }}
    >
      {data}
    </ButtonMUI>
  );
};

export default WhiteButton;
