import React, { useEffect, useState } from 'react';
import ListBoxItem from './ListBoxItem';
import axios from '../../../../node_modules/axios/index';
import { WorkplaceListBoxItem } from './Index';

function DeptShowWrapper({
  width,
  title,
  dataCount,
  data,
  FetchWorkplaceDetailInfo,
  handleAddClick,
  isAdding,
}) {
  const selectListWrapper = {
    position: 'relative',
    minWidth: width,
    width: width,
    height: '100%',
  };
  function ListDept({ data }) {
    // 로컬 스토리지에서 isOpen 값을 가져오거나 기본값(true)을 사용합니다.
    const [isOpen, setIsOpen] = useState(
      localStorage.getItem('companyIsOpen') === 'false' ? false : true
    );

    // 클릭 이벤트 핸들러를 정의합니다.
    const toggleOpen = () => {
      // 클릭 시 isOpen 상태를 반전시킵니다.
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);

      // 로컬 스토리지에 isOpen 값을 저장합니다.
      localStorage.setItem('companyIsOpen', newIsOpen);
    };

    return (
      <div>
        <div onClick={toggleOpen}>
          {data.co_CD}. {data.co_NM}
        </div>
        {/* isOpen 상태에 따라 하위 컴포넌트를 렌더링하거나 숨깁니다. */}
        {isOpen &&
          data.divs.map(div => <Division key={div.div_CD} data={div} />)}
      </div>
    );
  }

  function Division({ data }) {
    // 로컬 스토리지에서 isOpen 값을 가져오거나 기본값(false)을 사용합니다.
    const [isOpen, setIsOpen] = useState(
      localStorage.getItem('divisionIsOpen') === 'true' || false
    );

    // 클릭 이벤트 핸들러를 정의합니다.
    const toggleOpen = () => {
      // 클릭 시 isOpen 상태를 반전시킵니다.
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);

      // 로컬 스토리지에 isOpen 값을 저장합니다.
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
        {/* isOpen 상태에 따라 하위 컴포넌트를 렌더링하거나 숨깁니다. */}
        {isOpen &&
          data.depts.map(dept => (
            <Department key={dept.dept_CD} data={dept} roof={2} />
          ))}
      </div>
    );
  }

  function Department({ data, roof }) {
    const localStorageKey = `departmentIsOpen_${data.dept_CD}`;

    // 로컬 스토리지에서 각 항목의 고유한 상태를 가져옵니다.
    const [isOpen, setIsOpen] = useState(
      localStorage.getItem(localStorageKey) === 'true' || false
    );

    // 클릭 이벤트 핸들러를 정의합니다.
    const toggleOpen = () => {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);

      // 로컬 스토리지에 각 항목의 고유한 상태를 저장합니다.
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
            <Department
              key={subDept.dept_CD}
              data={subDept}
              roof={parsedRoof + 1}
            />
          ))}
      </div>
    );
  }

  return (
    <div style={selectListWrapper}>
      <div className="deptListBoxHeader">
        <span className="deptListBoxtitle">· {title}</span>
        <span className="deptListBoxSort">필터</span>
      </div>
      <div className="deptListWrapper">
        {data.map(company => (
          <ListDept key={company.co_CD} data={company} />
        ))}
      </div>
    </div>
  );
}

export default DeptShowWrapper;
