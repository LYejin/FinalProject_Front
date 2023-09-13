import React, { useState } from 'react';
import ListDept from './ListDept';
import workpImg from './workpImg.png';

function ListDivision({ data, searchValue }) {
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem('divisionIsOpen') === 'true' || false
  );

  const toggleOpen = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem('divisionIsOpen', newIsOpen);
  };

  const highlightStyle =
    searchValue &&
    (data.div_CD.includes(searchValue) || data.div_NM.includes(searchValue))
      ? { border: '1px solid blue', backgroundColor: '#D3FFFF' }
      : {};

  return (
    <div>
      <div
        style={{
          paddingLeft: '20px',
          height: '30px',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
        }}
      >
        <span
          onClick={toggleOpen}
          style={{
            ...highlightStyle,
            display: 'inline-block',
            cursor: 'pointer',
            padding: 2,
          }}
        >
          <img src={workpImg} alt="" style={{ verticalAlign: 'middle' }} />{' '}
          {data.div_CD}. {data.div_NM}
        </span>
      </div>
      {isOpen &&
        data.depts.map(dept => (
          <ListDept
            key={dept.dept_CD}
            data={dept}
            roof={2}
            deptStyle={'bold'}
            searchValue={searchValue}
          />
        ))}
    </div>
  );
}

export default ListDivision;
