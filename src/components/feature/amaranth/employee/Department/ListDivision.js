import React, { useState } from 'react';
import ListDept from './ListDept';
import workpImg from './workpImg.png';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';

function ListDivision({
  data,
  searchValue,
  selectedDeptCd,
  setSelectedDeptCd,
  handleSelectDepartment,
  setSelectedDivCd,
  setSelectedDivCdName,
  setIsUpdate,
  isModalYN,
  MdeptCD,
  setMdeptCD,
}) {
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem('divisionIsOpen') === 'true' || false
  );

  const toggleOpen = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem('divisionIsOpen', newIsOpen);
  };

  const onDivisonClick = () => {
    if (isModalYN === false) {
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

export default ListDivision;
