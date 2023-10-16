import React, { useEffect, useState } from 'react';
import { authAxiosInstance } from '../../../../axios/axiosInstance';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import DateSelectBox from './DateSelectBox';

const FixedDailyChart = ({ DISP_SQ, DIV_CD }) => {
  const [inputYear, setInputYear] = useState('2023');
  const [inputMonth, setInputMonth] = useState('10');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDailyAmount = async () => {
      try {
        const response = await authAxiosInstance.get(
          `/accounting/user/AcashFixManage/dailyAmount/`,
          {
            params: {
              DIV_CD: DIV_CD,
              inputYear: inputYear,
              DISP_SQ: DISP_SQ,
              inputMonth: inputMonth,
            },
          }
        );

        console.log('Daily chart data: ', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching daily data:', error);
      }
    };

    fetchDailyAmount();
  }, [inputYear, inputMonth, DISP_SQ, DIV_CD]);

  const formatValue = value => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleYearChange = e => {
    setInputYear(e.target.value);
  };

  const handleMonthChange = e => {
    setInputMonth(e.target.value);
  };

  return (
    <>
      <DateSelectBox
        type={'year'}
        value={inputYear}
        onChange={handleYearChange}
      />
      <DateSelectBox
        type={'month'}
        value={inputMonth}
        onChange={handleMonthChange}
      />
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={data}
          margin={{ top: 40, right: 40, bottom: 50, left: 40 }}
        >
          <text
            x={800}
            y={5}
            dy={16}
            textAnchor="middle"
            fill="#000"
            fontSize={16}
          ></text>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey={entry => `${entry.DAY}일`}
            label={{
              value: '단위: (일)',
              position: 'bottom',
              offset: 10,
              dy: -10,
              dx: 720,
            }}
          />
          <YAxis
            label={{
              value: '단위: (원)',
              position: 'insideLeft',
              dy: -25,
              dx: -20,
            }}
          />
          dx 및 dy의 값은 레이블의 위치를 미세
          <Tooltip formatter={value => formatValue(value)} />
          <Legend />
          <Bar dataKey="TOTAL_AMOUNT" name="일자별 금액" fill="#7ac4c0" />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default FixedDailyChart;
