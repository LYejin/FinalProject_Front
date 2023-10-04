import React, { useState, useContext } from 'react';
import deptImg from './deptImg.png';
import { DeptContext } from '../../../../pages/amaranth10/DepartmentPage';

function ListDept({ data, roof, deptStyle, searchValue }) {
  const { handleSelectDepartment } = useContext(DeptContext);

  const onDeptClick = () => {
    handleSelectDepartment(data.dept_CD, data.div_CD);
  };

  const localStorageKey = `departmentIsOpen_${data.dept_CD}`;

  const [isOpen, setIsOpen] = useState(
    localStorage.getItem(localStorageKey) === 'true' || false
  );

  const toggleOpen = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem(localStorageKey, newIsOpen);
  };

  const parsedRoof = parseInt(roof, 10);

  const highlightStyle =
    searchValue &&
    (data.dept_CD.includes(searchValue) || data.dept_NM.includes(searchValue))
      ? { border: '1px solid blue', backgroundColor: '#D3FFFF' }
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
          {data.subDepts && data.subDepts.length > 0 && (isOpen ? '▼' : '▶')}
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
