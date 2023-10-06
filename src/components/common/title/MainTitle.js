import React from 'react';

const MainTitle = ({ mainTitle }) => {
  return (
    <div className="mainTitleWrapper">
      <div className="menuBox">
        <i className="fas fa-bars"></i>
      </div>
      <div className="titleName">{mainTitle}</div>
    </div>
  );
};

export default MainTitle;
