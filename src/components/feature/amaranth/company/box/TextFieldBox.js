import React, { useRef } from 'react';

const TextFieldBox = ({ width, value, SearchDataSet, searchData }) => {
  const TextFieldBoxWrapper = {
    height: '23px',
    width: width,
    fontSize: '0.8rem',
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
      defaultValue={value}
      Placeholder="회사코드/회사명 입력"
    />
  );
};

export default TextFieldBox;
