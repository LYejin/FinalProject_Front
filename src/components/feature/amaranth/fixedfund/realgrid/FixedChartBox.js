import React, { useEffect, useState } from 'react';
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
import { authAxiosInstance } from '../../../../../axios/axiosInstance';

const FixedChartBox = ({ children }) => {
  const [div_CD, setDiv_CD] = useState('5555');
  const [useCoCd, setUseCoCd] = useState('1004');
  const [inputYear, setInputYear] = useState('2023');
  const [DISP_SQ, setDISP_SQ] = useState('1');
  const [YearAomout, setYearAmount] = useState('');

  const GetYearAmount = async () => {
    try {
      const response = await authAxiosInstance.get(
        `/accounting/user/AcashFixManage/yearlyAmounts/`,
        {
          params: {
            DIV_CD: div_CD,
            CO_CD: useCoCd,
            inputYear: inputYear,
            DISP_SQ: DISP_SQ,
          },
        }
      );
      console.log('연간 차트 데이터? : ', response.data);

      // 데이터 변환
      const formattedData = response.data.map(data => ({
        YEAR: data.YEAR,
        고정자금수: data.PAYMENT_COUNT,
        총금액: data.TOTAL_AMOUNT,
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

  useEffect(() => {
    GetYearAmount();
  }, []);

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
        }}
      >
        <span>(!!)야생의 피카츄가 나타났다</span>
        {/* <ResponsiveContainer>
          <ComposedChart
            width={600}
            height={400}
            data={YearAomout}
            margin={{ top: 40, right: 40, bottom: 30, left: 40 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="YEAR" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="총금액" barSize={30} fill="#7ac4c0" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="고정자금수"
              stroke="#ff7300"
            />
          </ComposedChart>
        </ResponsiveContainer> */}
      </div>
    </>
  );
};

export default FixedChartBox;
