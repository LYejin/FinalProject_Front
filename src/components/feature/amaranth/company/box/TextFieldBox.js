import React, { useRef } from 'react';

const TextFieldBox = ({ width, value, SearchDataSet, searchData }) => {
  const TextFieldBoxWrapper = {
    height: '28px',
    width: '210px',
    fontSize: '0.73rem',
    border: '1px solid #ccc',
    paddingLeft: '10px',
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
        CO_NM: inputValue.trim(),
      }));
    }
  };

  return (
    <input
      onChange={handlerOnChange}
      style={TextFieldBoxWrapper}
      className="comtextInputBox"
      defaultValue={value}
      placeholder="회사코드/회사명을 입력하세요."
    />
  );
};

export default TextFieldBox;
