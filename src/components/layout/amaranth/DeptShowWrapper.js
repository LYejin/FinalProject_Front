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

  function Company({ data }) {
    return (
      <div>
        <div>{data.co_CD}</div>
        {data.divs.map(div => (
          <Division key={div.div_CD} data={div} />
        ))}
      </div>
    );
  }

  function Division({ data }) {
    return (
      <div>
        <div
          style={{
            paddingLeft: '30px',
            backgroundColor: 'red',
            border: '1px solid black',
          }}
        >
          {data.div_CD}
        </div>
        {data.depts.map(dept => (
          <Department key={dept.dept_CD} data={dept} />
        ))}
      </div>
    );
  }

  function Department({ data }) {
    return (
      <div>
        <div
          style={{
            paddingLeft: '30px',
            backgroundColor: 'green',
            border: '1px solid black',
          }}
        >
          {data.dept_CD}
        </div>
        {data.subDepts &&
          data.subDepts.map(subDept => (
            <Department key={subDept.dept_CD} data={subDept} />
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
          <Company key={company.co_CD} data={company} />
        ))}
      </div>
    </div>
  );
}

export default DeptShowWrapper;
