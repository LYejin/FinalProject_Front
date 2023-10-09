import React, { useState, useEffect } from 'react';
import deptImg from './deptImg.png';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';

function ListDept({
  data,
  roof,
  deptStyle,
  handleSelectDepartment,
  selectedDeptCd,
  MdeptCD,
  setMdeptCD,
  searchValue,
  setSelectedDivCd,
  setSelectedDivCdName,
  setSelectedDeptCd,
  setIsUpdate,
  isModalYN,
}) {
  const localStorageKey = `departmentIsOpen_${data.dept_CD}`;
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem(localStorageKey) === 'true' || false
  );
  //모달창에서 선택시
  const [selectedForModalDeptCd, setSelectedForModalDeptCd] = useState(null);

  const isDisabled = data.dept_YN === '0';
  const textColor = isDisabled ? 'grey' : 'blue';
  const imageStyle = isDisabled ? { filter: 'grayscale(100%)' } : {};

  useEffect(() => {
    if (searchValue) {
      setSelectedDeptCd(searchValue);
    }
  }, [searchValue]);

  // console.log('deptCD : ', data.dept_CD, ' dept_YN : ', data.dept_YN);

  const onDeptClick = () => {
    if (isModalYN === false) {
      setMdeptCD(data.dept_CD);
      setSelectedDivCd(data.div_CD);
      setSelectedForModalDeptCd(data.dept_CD);
      handleSelectDepartment(
        data.dept_CD,
        data.div_CD,
        data.dept_NM,
        data.div_NM
      );
      return;
    }

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
    <div>
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
            roof={parsedRoof + 1}
            searchValue={searchValue}
            selectedDeptCd={selectedDeptCd}
            setSelectedDeptCd={setSelectedDeptCd}
            handleSelectDepartment={handleSelectDepartment}
            setSelectedDivCd={setSelectedDivCd}
            setSelectedDivCdName={setSelectedDivCdName}
            setIsUpdate={setIsUpdate}
            isModalYN={false}
            MdeptCD={MdeptCD}
            setMdeptCD={setMdeptCD}
          />
        ))}
    </div>
  );
}

export default ListDept;
