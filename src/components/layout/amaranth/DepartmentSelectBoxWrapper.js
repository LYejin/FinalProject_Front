import React from 'react';

const DepartmentSelectBoxWrapper = ({ children }) => {
  return (
    <div
      className="deptSelectBoxWrapper"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#F3F7FA',
      }}
    >
      <span>(!!)</span>
      <span>
        회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/임시'유형을 선택하여
        등록할 수 있습니다.
      </span>
    </div>
  );
};

export default DepartmentSelectBoxWrapper;
