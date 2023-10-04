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

  const isDisabled = data.dept_YN === '0';
  const textColor = isDisabled ? 'grey' : 'blue';
  const imageStyle = isDisabled ? { filter: 'grayscale(100%)' } : {};

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
          color: textColor, // 동적으로 색상 설정
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
            color: textColor, // 동적으로 색상 설정
          }}
        >
          <img src={deptImg} style={imageStyle} /> {data.dept_CD}.{' '}
          {data.dept_NM}
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
    // <div
    //   style={{
    //     // 이 부분이 visibility를 조건적으로 설정합니다.
    //     visibility: isDisabled ? 'hidden' : 'visible',
    //   }}
    // >
    //   <div
    //     style={{
    //       paddingLeft: `${parsedRoof * 15}px`,
    //       height: '30px',
    //       fontSize: '16px',
    //       display: 'flex',
    //       alignItems: 'center',
    //       color: textColor,
    //       margin: '3px 3px',
    //       fontWeight: deptStyle,
    //     }}
    //   >
    //     <span
    //       onClick={toggleOpen}
    //       style={{
    //         fontSize: '12px',
    //         alignItems: 'center',
    //         width: 15,
    //         color: 'black',
    //       }}
    //     >
    //       {data.subDepts &&
    //         data.subDepts.length > 0 &&
    //         (isOpen ? <FaAngleDown /> : <FaAngleRight />)}
    //     </span>
    //     <span
    //       onClick={onDeptClick}
    //       style={{
    //         ...highlightStyle,
    //         display: 'inline-block',
    //         cursor: 'pointer',
    //         padding: 2,
    //         color: textColor,
    //       }}
    //     >
    //       <img src={deptImg} style={imageStyle} /> {data.dept_CD}.{' '}
    //       {data.dept_NM}
    //     </span>
    //   </div>
    //   {isOpen &&
    //     !isDisabled && // 여기에서 추가적으로 subDepts를 숨기기 위해 isDisabled를 체크합니다.
    //     data.subDepts &&
    //     data.subDepts.map(subDept => (
    //       <ListDept
    //         key={subDept.dept_CD}
    //         data={subDept}
    //         roof={parsedRoof + 1}
    //         searchValue={searchValue}
    //       />
    //     ))}
    // </div>
  );
}

export default ListDept;
