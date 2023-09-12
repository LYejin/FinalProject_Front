import React, { useState } from 'react';
import ListDept from './ListDept';

function ListDivision({ data }) {
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem('divisionIsOpen') === 'true' || false
  );

  const toggleOpen = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem('divisionIsOpen', newIsOpen);
  };

  return (
    <div>
      <div
        onClick={toggleOpen}
        style={{
          cursor: 'pointer',
          paddingLeft: '20px',
          backgroundColor: 'red',
          border: '1px solid black',
        }}
      >
        {data.div_CD}. {data.div_NM}
      </div>
      {isOpen &&
        data.depts.map(dept => (
          <ListDept key={dept.dept_CD} data={dept} roof={2} />
        ))}
    </div>
  );
}

export default ListDivision;
