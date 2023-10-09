import React, { useState } from 'react';
import { authAxiosInstance } from '../../../../axios/axiosInstance';
import FixedYearChart from './FixedYearChart';
import FixedQuarterChart from './FixedQuarterChart';
import FixedMonthChart from './FixedMonthChart';
import FixedDailyChart from './FixedDailyChart';

const FixedChartBox = ({ children }) => {
  const [selectedChart, setSelectedChart] = useState('연간'); // 기본으로 "연간"이 선택된 상태로 설정

  const renderChart = () => {
    switch (selectedChart) {
      case '연간':
        return <FixedYearChart />;
      case '분기':
        return <FixedQuarterChart />;
      case '월별':
        return <FixedMonthChart />;
      case '일자별':
        return <FixedDailyChart />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="ChartStateSelectBar">
        {['연간', '분기', '월별', '일자별'].map(label => (
          <span
            key={label}
            className={
              selectedChart === label ? 'SelectChartStateBox' : 'ChartStateBox'
            }
            onClick={() => setSelectedChart(label)}
          >
            {label}
          </span>
        ))}
      </div>
      <div
        className="FixedChartBoxWrapper"
        style={{ display: 'flex', flexWrap: 'wrap', padding: 20 }}
      >
        {renderChart()}
      </div>
    </>
  );
};

export default FixedChartBox;
