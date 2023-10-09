import React from 'react';
import GetComp from './GetComp';

function DeptShowWrapper({
  width,
  height,
  title,
  data,
  searchValue,
  isModal,
  marginL,
  marginT,
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
  const selectListWrapper = {
    position: 'relative',
    minWidth: width,
    width: width,
    height: height,
    marginLeft: marginL,
    marginTop: marginT,
  };

  return (
    <div style={selectListWrapper}>
      {!isModal && (
        <div className="deptListBoxHeader">
          <span className="deptListBoxtitle">· {title}</span>
          <span className="deptListBoxSort">필터</span>
        </div>
      )}
      <div className="deptListWrapper">
        {data.map(company => (
          <GetComp
            key={company.co_CD}
            data={company}
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
    </div>
  );
}

export default DeptShowWrapper;
