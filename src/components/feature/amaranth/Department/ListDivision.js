import React, { useContext, useState } from 'react';
import ListDept from './ListDept';
import workpImg from './workpImg.png';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
import { DeptContext } from '../../../../pages/amaranth10/DepartmentPage';

function ListDivision({ data, searchValue }) {
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem('divisionIsOpen') === 'true' || false
  );
  const {
    setSelectedDivCd,
    setSelectedDivCdName,
    setSelectedDeptCd,
    setIsUpdate,
    isModal,
  } = useContext(DeptContext);
  const toggleOpen = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem('divisionIsOpen', newIsOpen);
  };

  console.log('====================================================');
  const onDivisonClick = () => {
    if (isModal === false) {
      return;
    }
    setSelectedDivCd(data.div_CD);
    setSelectedDivCdName(data.div_NM);
    setSelectedDeptCd('');
    setIsUpdate(false);
  };

  const highlightStyle =
    searchValue &&
    (data.div_CD.includes(searchValue) || data.div_NM.includes(searchValue))
      ? { border: '2px solid green' }
      : {};

  return (
    <div>
      <div
        style={{
          paddingLeft: '15px',
          height: '30px',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          margin: '3px 3px',
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
          {data.depts &&
            data.depts.length > 0 &&
            data.depts.some(dept => dept && dept.dept_CD) &&
            (isOpen ? <FaAngleDown /> : <FaAngleRight />)}
        </span>
        <span
          onClick={onDivisonClick}
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
