import React, { useState, useContext, useEffect } from 'react';
import deptImg from './deptImg.png';
import { DeptContext } from '../../../../pages/amaranth10/DepartmentPage';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';

function ListDept({ data, roof, deptStyle, searchValue }) {
  const {
    handleSelectDepartment,
    selectedDeptCd,
    setSelectedDeptCd,
    setSelectedDivCdName,
  } = useContext(DeptContext);
  const localStorageKey = `departmentIsOpen_${data.dept_CD}`;
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem(localStorageKey) === 'true' || false
  );

  useEffect(() => {
    if (searchValue) {
      setSelectedDeptCd(searchValue);
    }
  }, [searchValue]);

  const onDeptClick = () => {
    handleSelectDepartment(data.dept_CD, data.div_CD);
    setSelectedDeptCd(data.dept_CD);
    setSelectedDivCdName(data.div_NM);
  };

  if (!data || !data.dept_CD) return null;

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

  return (
    <div>
      <div
        style={{
          paddingLeft: `${parsedRoof * 15}px`,
          height: '30px',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          color: 'blue',
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
            display: 'inline-block',
            cursor: 'pointer',
            padding: 2,
          }}
        >
          <img src={deptImg} /> {data.dept_CD}. {data.dept_NM}
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
          />
        ))}
    </div>
  );
}

export default ListDept;
