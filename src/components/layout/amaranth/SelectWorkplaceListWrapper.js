import React from "react";
import ListBoxItem from "./ListBoxItem";

const SelectListWrapper = ({ width, title, dataCount, data }) => {
  const selectListWrapper = {
    position: "relative",
    width: width,
    height: "100%",
    border: "1px solid #ebebeb",
  };

  return (
    <div style={selectListWrapper}>
      <div className="listBoxHeader">
        <span className="listBoxtitle">{title}</span>
        <span className="listBoxDataCount">{dataCount}</span>건
        <span className="listBoxSort">정렬순</span>
      </div>
      <div className="listWrapper">
        {data.map((data) => (
          <ListBoxItem
            key={data.div_CD}
            leftTop={data.div_CD}
            rightTop={data.co_CD}
            leftBottom={data.div_NM}
          />
        ))}
      </div>
      <div className="footerBox">
        <i class="fa-solid fa-circle-plus"></i>추가
      </div>
    </div>
  );
};

export default SelectListWrapper;
