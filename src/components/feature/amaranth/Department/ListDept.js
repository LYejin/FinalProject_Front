import React, { useState, useContext, useEffect } from 'react';
import deptImg from './deptImg.png';
import { DeptContext } from '../../../../pages/amaranth10/DepartmentPage';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';

function ListDept({ data, roof, deptStyle, searchValue, parentDeptYN }) {
  const {
    handleSelectDepartment,
    selectedDeptCd,
    setSelectedDeptCd,
    setSelectedDivCdName,
    isModal,
    MdeptCD,
    setMdeptCD,
    setSelectedDivCd,
    setIsHighLevel,
    setIsLowLevel,
    useSelect,
    showSelect,
  } = useContext(DeptContext);
  const localStorageKey = `departmentIsOpen_${data.dept_CD}`;
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem(localStorageKey) === 'true' || false
  );
  //모달창에서 선택시
  const [selectedForModalDeptCd, setSelectedForModalDeptCd] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const isDisabled = data.dept_YN === '0';
  const textColor = isDisabled ? 'grey' : 'blue';
  const imageStyle = isDisabled ? { filter: 'grayscale(100%)' } : {};

  useEffect(() => {
    if (isModal === false) {
    }
    if (searchValue) {
      setSelectedDeptCd(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    let visibility = true;

    if (useSelect === '0' && showSelect === '1') {
      if (data.show_YN === 'N') {
        visibility = false;
      }
    } else if (useSelect === '1' && showSelect === '0') {
      if (data.dept_YN === '0') {
        visibility = false;
      }
    } else if (useSelect === '1' && showSelect === '1') {
      if (data.show_YN === 'N' || data.dept_YN === '0') {
        visibility = false;
      }
    }

    setIsVisible(visibility);
  }, [useSelect, showSelect, data]);

  console.log('이시발', isVisible);

  console.log(
    'deptCD : ',
    data.dept_CD,
    ' dept_YN : ',
    data.dept_YN,
    'show_YN :',
    data.show_YN
  );

  console.log('useSelect : ', useSelect, 'showSelect : ', showSelect);

  const onDeptClick = () => {
    if (isModal === false) {
      setMdeptCD(data.dept_CD);
      setSelectedDivCd(data.div_CD);
      setSelectedForModalDeptCd(data.dept_CD);
      return;
    }
    if (parentDeptYN === '0') {
      setIsHighLevel(true);
    } else {
      setIsHighLevel(false);
    }
    if (data.subDepts && data.subDepts.some(dept => dept.dept_YN === '1')) {
      setIsLowLevel(true);
    }

    handleSelectDepartment(data.dept_CD, data.div_CD);
    setSelectedDeptCd(data.dept_CD);
    setSelectedDivCdName(data.div_NM);
  };

  if (!data || !data.dept_CD || data.dept_YN === null) return null;

  const toggleOpen = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem(localStorageKey, newIsOpen);
  };

  const parsedRoof = parseInt(roof, 10);

  const highlightStyle =
    selectedDeptCd === data.dept_CD
      ? { border: '2px solid blue', backgroundColor: '#D3FFFF' }
      : {};

  const modalHighlightStyle =
    MdeptCD === data.dept_CD
      ? { border: '2px solid blue', backgroundColor: '#D3FFFF' }
      : {};

  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      <div
        style={{
          paddingLeft: `${parsedRoof * 15}px`,
          height: '30px',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          color: textColor,
          margin: '3px 3px',
          fontWeight: deptStyle,
        }}
      >
        <span
          onClick={toggleOpen}
          style={{
            fontSize: '12px',
            alignItems: 'center',
            width: 15,
            color: 'black',
          }}
        >
          {data.subDepts &&
            data.subDepts.length > 0 &&
            (isOpen ? <FaAngleDown /> : <FaAngleRight />)}
        </span>
        <span
          onClick={onDeptClick}
          style={{
            ...highlightStyle,
            ...modalHighlightStyle,
            display: 'inline-block',
            cursor: 'pointer',
            padding: 2,
            color: textColor,
          }}
        >
          <img src={deptImg} style={imageStyle} /> {data.dept_CD}.{' '}
          {data.dept_NM}
        </span>
      </div>
      {isOpen &&
        data.subDepts &&
        data.subDepts.map(subDept => (
          <ListDept
            key={subDept.dept_CD}
            data={subDept}
            parentDeptYN={data.dept_YN} // 상위 부서의 DEPT_YN 값을 prop으로 전달
            roof={parsedRoof + 1}
            searchValue={searchValue}
          />
        ))}
    </div>
  );
}

export default ListDept;
