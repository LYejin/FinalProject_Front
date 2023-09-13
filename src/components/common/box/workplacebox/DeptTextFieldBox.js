import React, { useState } from 'react';

const DeptTextFieldBox = ({ width, title, onInputChange, onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const TextFieldBoxWrapper = {
    height: '30px',
    width: '260px',
    fontSize: '0.73rem',
    border: '1px solid #ccc',
    marginLeft: '8px',
    paddingLeft: '10px',
    marginTop: '-3px',
  };

  const SerachButton = {
    marginLeft: '5px',
    height: '30px',
    width: '50px',
    border: '1px solid darkgray',
    backgroundColor: 'white',
    marginTop: '-3px',
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
    if (onInputChange) {
      onInputChange(event.target.value);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '8px' }}>{title}</span>
      <input
        style={TextFieldBoxWrapper}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="코드/사업장/부서명을 입력하세요."
      />
      <button style={SerachButton} onClick={handleSearchClick}>
        조회
      </button>
    </div>
  );
};

export default DeptTextFieldBox;
