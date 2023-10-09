import React, { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';

const DeptTextFieldBox = ({
  width,
  title,
  onInputChange,
  onSearch,
  allDepartmentData,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [matchedValues, setMatchedValues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedDeptCDs, setSortedDeptCDs] = useState([]);
  const [isMatch, setIsMatch] = useState(true);

  useEffect(() => {
    setSortedDeptCDs(getSortedDeptCDs(allDepartmentData));
  }, [allDepartmentData]);

  const TextFieldBoxWrapper = {
    height: '30px',
    width: '280px',
    fontSize: '0.73rem',
    border: '1px solid #ccc',
    marginLeft: '8px',
    paddingLeft: '10px',
    marginTop: '-3px',
  };

  // 전체 데이터를 사업장과 부서의 데이터 배열로 변환
  const getSortedDeptCDs = data => {
    if (data) {
      let result = [];

      let divGroups = {};
      data.forEach(item => {
        if (!divGroups[item.div_CD]) divGroups[item.div_CD] = [];
        divGroups[item.div_CD].push(item);
      });

      const findSubItems = (dept_CD, items) => {
        const subItems = items
          .filter(item => item.mdept_CD === dept_CD)
          .sort((a, b) => {
            const aSortValue =
              a.sort_YN !== undefined ? parseInt(a.sort_YN) : Infinity;
            const bSortValue =
              b.sort_YN !== undefined ? parseInt(b.sort_YN) : Infinity;

            return (
              aSortValue - bSortValue ||
              (a.dept_CD || '').localeCompare(b.dept_CD || '')
            );
          });

        subItems.forEach(subItem => {
          if (result.find(item => item.dept_CD === subItem.dept_CD)) return;
          result.push({ dept_CD: subItem.dept_CD, dept_NM: subItem.dept_NM });
          findSubItems(subItem.dept_CD, items);
        });
      };

      Object.keys(divGroups)
        .sort()
        .forEach(div_CD => {
          let group = divGroups[div_CD];
          result.push({ div_CD, div_NM: group[0].div_NM });

          let noMdeptItems = group
            .filter(item => !item.mdept_CD)
            .sort((a, b) => {
              const aSortValue =
                a.sort_YN !== undefined ? parseInt(a.sort_YN) : Infinity;
              const bSortValue =
                b.sort_YN !== undefined ? parseInt(b.sort_YN) : Infinity;

              return (
                aSortValue - bSortValue ||
                (a.dept_CD || '').localeCompare(b.dept_CD || '')
              );
            });

          noMdeptItems.forEach(item => {
            result.push({ dept_CD: item.dept_CD, dept_NM: item.dept_NM });
            findSubItems(item.dept_CD, group);
          });
        });

      return result;
    }
  };

  //현재 부서의 배열
  // console.log(sortedDeptCDs);

  //입력값이 바뀔 때
  const handleInputChange = event => {
    setInputValue(event.target.value);
    if (onInputChange) {
      onInputChange(event.target.value);
    }
    if (matchedValues.length > 0) {
      setMatchedValues([]);
    }
  };

  //검색 버튼 클릭 이벤트
  const handleSearchClick = () => {
    if (inputValue) {
      const newMatchedValues = sortedDeptCDs.filter(
        dept =>
          (dept.div_CD && dept.div_CD.includes(inputValue)) ||
          (dept.div_NM && dept.div_NM.includes(inputValue)) ||
          (dept.dept_CD && dept.dept_CD.includes(inputValue)) ||
          (dept.dept_NM && dept.dept_NM.includes(inputValue))
      );
      setMatchedValues(
        newMatchedValues.map(item => item.dept_CD || item.div_CD)
      );
      if (newMatchedValues.length > 0) {
        setCurrentIndex(0);
        onSearch(newMatchedValues[0].dept_CD || newMatchedValues[0].div_CD);
        setIsMatch(true);
      } else {
        setIsMatch(false);
      }
    }
  };

  //검색값이 여러개일 경우, 버튼클릭 이벤트
  const handleNextValueClick = () => {
    const nextIndex = (currentIndex + 1) % matchedValues.length;
    setCurrentIndex(nextIndex);
    onSearch(matchedValues[nextIndex]);
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
      {!isMatch && (
        <div
          style={{
            right: '0px',
            marginRight: '55px',
            position: 'absolute',
            color: 'red',
          }}
        >
          결과값이 없습니다
        </div>
      )}
      {matchedValues.length > 0 && (
        <div
          style={{
            right: '0px',
            marginRight: '55px',
            position: 'absolute',
            color: 'red',
          }}
        >
          ( {currentIndex + 1} / {matchedValues.length} )
        </div>
      )}
      {matchedValues.length < 2 && (
        <button className="DPcustomButton" onClick={handleSearchClick}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      )}
      {matchedValues.length > 1 && (
        <button className="DPcustomButtonNext" onClick={handleNextValueClick}>
          <FaAngleRight />
        </button>
      )}
    </div>
  );
};

export default DeptTextFieldBox;
