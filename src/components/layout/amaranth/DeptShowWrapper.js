import React from 'react';
import GetComp from '../../feature/amaranth/Department/GetComp';

function DeptShowWrapper({ width, title, data, searchValue }) {
  const selectListWrapper = {
    position: 'relative',
    minWidth: width,
    width: width,
    height: '100%',
  };

  return (
    <div style={selectListWrapper}>
      <div className="deptListBoxHeader">
        <span className="deptListBoxtitle">· {title}</span>
        <span className="deptListBoxSort">필터</span>
      </div>
      <div className="deptListWrapper">
        {data.map(company => (
          <GetComp
            key={company.co_CD}
            data={company}
            searchValue={searchValue}
          />
        ))}
      </div>
    </div>
  );
}

export default DeptShowWrapper;
