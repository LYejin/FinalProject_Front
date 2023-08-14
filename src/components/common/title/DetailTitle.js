import React from "react";

const DetailTitle = ({ detailTitle, children }) => {
  return (
    <div className="detailTitleWrapper">
      <i class="fa-solid fa-circle"></i>
      {detailTitle}
      {children}
    </div>
  );
};

export default DetailTitle;
