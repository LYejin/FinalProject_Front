import React, { useRef } from 'react';

const TextFieldBox = ({ width, value, SearchDataSet, searchData }) => {
  const TextFieldBoxWrapper = {
    border: '1px solid #b6b6b6',
    width: '200px',
    height: '29px',
    borderradius: '3px',
  };

  const handlerOnChange = e => {
    const inputValue = e.target.value;
    const USE_YN = searchData?.USE_YN;
    SearchDataSet({});
    if (USE_YN !== undefined) {
      console.log('＃＃＃＃＃＃＃＃＃＃＃＃', USE_YN);
      SearchDataSet(prevData => ({
        ...prevData,
        USE_YN: USE_YN,
      }));
    }
    console.log('입력된', inputValue, USE_YN);
    if (
      !isNaN(inputValue) &&
      typeof inputValue === 'string' &&
      inputValue !== ''
    ) {
      const numericValue = parseInt(inputValue, 10);
      console.log('★★');
      SearchDataSet(prevData => ({
        ...prevData,
        CO_CD: numericValue,
      }));
    } else if (isNaN(inputValue)) {
      SearchDataSet(prevData => ({
        ...prevData,
        CO_NM: inputValue,
      }));
    }
  };

  return (
    <input
      onChange={handlerOnChange}
      style={TextFieldBoxWrapper}
      className="textInputBox "
      defaultValue={value}
    />
  );
};

export default TextFieldBox;
