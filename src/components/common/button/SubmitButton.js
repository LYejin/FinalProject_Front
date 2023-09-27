import React from 'react';
import ButtonMUI from '@mui/material/Button';

const SubmitButton = ({ data, width, height }) => {
  return (
    <ButtonMUI
      type="submit"
      variant="contained"
      size="small"
      sx={{
        backgroundImage: 'linear-gradient(#F9F9F9, #EAEAEA)',
        border: '1px solid lightgray',
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#000000',
        transition: 'border-color 0.3s',
        boxShadow: 'none',
        height: '26px',
        marginLeft: '10px',
        '&:hover': {
          borderColor: '#000000',
          boxShadow: 'none',
        },
      }}
    >
      {data}
    </ButtonMUI>
  );
};

export default SubmitButton;
