import React, { useState } from 'react';

function ListDept({ data, roof }) {
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

  return (
    <div>
      <div
        onClick={toggleOpen}
        style={{
          paddingLeft: `${parsedRoof * 20}px`,
          backgroundColor: 'green',
          border: '1px solid black',
          cursor: 'pointer',
        }}
      >
        {data.dept_CD}. {data.dept_NM}
      </div>
      {isOpen &&
        data.subDepts &&
        data.subDepts.map(subDept => (
          <ListDept
            key={subDept.dept_CD}
            data={subDept}
            roof={parsedRoof + 1}
          />
        ))}
    </div>
  );
}

export default ListDept;
