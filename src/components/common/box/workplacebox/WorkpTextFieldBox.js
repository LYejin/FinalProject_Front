import React, { useState } from 'react';

const WorkpTextFieldBox = ({ width, title, onInputChange }) => {
  const [inputValue, setInputValue] = useState('');

  const TextFieldBoxWrapper = {
    height: '28px',
    width: '210px',
    fontSize: '0.73rem',
    border: '1px solid #ccc',
    paddingLeft: '10px',
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
    if (onInputChange) {
      onInputChange(event.target.value);
    }
  };

  return (
    <div style={{ alignItems: 'center', width: width }}>
      <span style={{ marginRight: '8px' }}>{title}</span>
      <input
        style={TextFieldBoxWrapper}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="사업장코드/사업장명을 입력하세요."
      />
    </div>
  );
};

export default WorkpTextFieldBox;
