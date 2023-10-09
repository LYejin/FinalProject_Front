import React, { useEffect, useState } from 'react';
import { authAxiosInstance } from '../../../../axios/axiosInstance';
import FixedYearChart from './FixedYearChart';
import FixedQuarterChart from './FixedQuarterChart';

const FixedChartBox = ({ children }) => {
  return (
    <>
      <div className="ChartStateSelectBar">
        <span className="ChartStateBox">기본</span>
        <span className="SelectChartStateBox">과목</span>

        <span className="ChartStateBox">연간</span>
        <span className="ChartStateBox">분기</span>
      </div>
      <div
        className="FixedChartBoxWrapper"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: 20,
        }}
      >
        {/* <FixedYearChart /> */}
        <FixedQuarterChart />
      </div>
    </>
  );
};

export default FixedChartBox;
