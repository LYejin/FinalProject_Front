import React from 'react';
import GetComp from '../../feature/amaranth/Department/GetComp';
import FilterSelectBox from '../../feature/amaranth/Department/FilterSelectBox';

function DeptShowWrapper({
  width,
  height,
  title,
  data,
  searchValue,
  isModal,
  marginL,
  marginT,
  useSelect,
  showSelect,
  setUseSelect,
  setShowSelect,
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
          <span className="deptListBoxSort">
            <FilterSelectBox
              useSelect={useSelect}
              showSelect={showSelect}
              setUseSelect={setUseSelect}
              setShowSelect={setShowSelect}
            />
          </span>
        </div>
      )}
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
