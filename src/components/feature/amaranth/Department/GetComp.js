import React, { useState } from 'react';
import ListDivision from './ListDivision';
import compImg from './compImg.png';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';

function GetComp({ data, searchValue }) {
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem('companyIsOpen') === 'false' ? false : true
  );

  const toggleOpen = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem('companyIsOpen', newIsOpen);
  };

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
            fontSize: '12px',
            alignItems: 'center',
            width: 15,
          }}
        >
          {data.divs &&
            data.divs.length > 0 &&
            data.divs.some(div => div && div.div_CD) &&
            (isOpen ? <FaAngleDown /> : <FaAngleRight />)}
        </span>
        <span
          onClick={toggleOpen}
          style={{
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
