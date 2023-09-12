import React, { useState } from 'react';
import ListDivision from './ListDivision';

function GetComp({ data }) {
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
      <div onClick={toggleOpen}>
        {data.co_CD}. {data.co_NM}
      </div>
      {isOpen &&
        data.divs.map(div => <ListDivision key={div.div_CD} data={div} />)}
    </div>
  );
}

export default GetComp;
