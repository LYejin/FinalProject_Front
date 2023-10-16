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
const FixedYearChart = ({ DISP_SQ, DIV_CD, isRender }) => {
  const [inputYear, setInputYear] = useState('2023');
  const [YearAomout, setYearAmount] = useState('');

  const GetYearAmount = async () => {
    try {
      const response = await authAxiosInstance.get(
        `/accounting/user/AcashFixManage/yearlyAmounts/`,
        {
          params: {
            DIV_CD: DIV_CD,
            inputYear: inputYear,
            DISP_SQ: DISP_SQ,
          },
        }
      );
      console.log('연간 차트 데이터? : ', response.data);

      // 데이터 변환
      const formattedData = response.data.map(data => ({
        연도: data.YEAR,
        '고정 자금수': data.PAYMENT_COUNT,
        '총금액(원)': data.TOTAL_AMOUNT,
      }));

      setYearAmount(formattedData);
      console.log(
        'xAxis',
        formattedData.map(item => item.xAxis)
      );
    } catch (error) {
      console.error('Error fetching department data:', error);
      return null;
    }
  };

  const handleYearChange = e => {
    setInputYear(e.target.value);
  };

  useEffect(() => {
    GetYearAmount();
  }, [inputYear, DISP_SQ, DIV_CD, isRender]);

  return (
    <>
      <DateSelectBox
        type={'year'}
        value={inputYear}
        onChange={handleYearChange}
      />
      <ResponsiveContainer>
        <ComposedChart
          width={600}
          height={600}
          data={YearAomout}
          margin={{ top: 50, right: 40, bottom: 30, left: 40 }}
          startAnimation="disabled"
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="연도" />
          <YAxis
            yAxisId="left"
            label={{ value: '원', offset: 30, angle: 0, position: 'top' }}
          />
          <YAxis
            yAxisId="right"
            label={{
              value: '자금 수',
              offset: 30,
              angle: 0,
              position: 'top',
            }}
            orientation="right"
          />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="총금액(원)"
            barSize={30}
            fill="#7ac4c0"
          />
          <Line yAxisId="right" dataKey="고정 자금수" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default FixedYearChart;
