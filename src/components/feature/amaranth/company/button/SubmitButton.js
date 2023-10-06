import React from 'react';
import ButtonMUI from '@mui/material/Button';

const SubmitButton = ({ data, width, height }) => {
  return (
    <ButtonMUI
      type="submit"
      variant="contained"
      size="small"
      className="WhiteButton"
    >
      {data}
    </ButtonMUI>
  );
};

export default SubmitButton;
