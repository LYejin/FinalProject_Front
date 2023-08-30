import React from 'react';

const TextFieldBox = ({ width, value }) => {
  const TextFieldBoxWrapper = {
    height: '23px',
    width: width,
    fontSize: '0.8rem',
  };

  return <input style={TextFieldBoxWrapper} defaultValue={value} />;
};

export default TextFieldBox;
