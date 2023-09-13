import React, { useState } from 'react';
import ListDivision from './ListDivision';
import compImg from './compImg.png';

function GetComp({ data, searchValue }) {
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem('companyIsOpen') === 'false' ? false : true
  );

  const toggleOpen = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem('companyIsOpen', newIsOpen);
  };

  const highlightStyle =
    searchValue &&
    (data.co_CD.includes(searchValue) || data.co_NM.includes(searchValue))
      ? { border: '1px solid blue', backgroundColor: '#D3FFFF' }
      : {};

  return (
    <div>
      <div
        onClick={toggleOpen}
        style={{
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
          <img src={compImg} /> {data.co_CD}. {data.co_NM}
        </span>
      </div>
      {isOpen &&
        data.divs.map(div => (
          <ListDivision key={div.div_CD} data={div} searchValue={searchValue} />
        ))}
    </div>
  );
}

export default GetComp;
