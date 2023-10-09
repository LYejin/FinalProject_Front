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

const FixedDailyChart = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDailyAmount = async () => {
      try {
        const response = await authAxiosInstance.get(
          `/accounting/user/AcashFixManage/dailyAmount/`,
          {
            params: {
              DIV_CD: '5555',
              CO_CD: '1004',
              inputYear: '2023',
              DISP_SQ: '1',
              inputMonth: '12',
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
  }, []);

  const formatValue = value => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
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
        >
          {`월 일자별 금액`}
        </text>
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
  );
};

export default FixedDailyChart;
