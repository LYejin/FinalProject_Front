import React from "react";
import ListBoxItem from "../../../layout/amaranth/ListBoxItem";

const EmpSelectListWrapper = ({
  width,
  title,
  dataCount,
  data,
  clickBoxEvent,
  clickInsertBoxEvent,
}) => {
  const selectListWrapper = {
    position: "relative",
    minWidth: width,
    height: "100%",
    border: "1px solid #ebebeb",
  };

  const onClickInsertEmp = (e) => {
    console.log("boxclick");
    clickInsertBoxEvent(data);
  };

  return (
    <div style={selectListWrapper}>
      <div className="listBoxHeader">
        <span className="listBoxtitle">{title}</span>
        <span className="listBoxDataCount">{dataCount}</span>건
        <span className="listBoxSort">정렬순</span>
      </div>
      <div className="listWrapper">
        {data.map((info) => (
          <ListBoxItem
            key={info.username}
            leftTop={info.username}
            rightTop={info.join_DT || "5555"}
            leftBottom={info.kor_NM}
            clickBoxEvent={clickBoxEvent}
          />
        ))}
        {/* {data.map((data) => (
          <ListBoxItem data={data} />
        ))} */}
      </div>
      <div className="footerBox" onClick={onClickInsertEmp}>
        <i class="fa-solid fa-circle-plus"></i>사원추가
      </div>
    </div>
  );
};

export default EmpSelectListWrapper;
