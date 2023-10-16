import React, { useEffect, useState } from 'react';
import { authAxiosInstance } from '../../../../axios/axiosInstance';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import DateSelectBox from './DateSelectBox';

const FixedQuarterChart = ({ DISP_SQ, DIV_CD }) => {
  const [inputYear, setInputYear] = useState('2023');
  const [quarterlyAmount, setQuarterlyAmount] = useState([]);

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#A28BE0',
    '#FC666D',
    '#70E0E0',
  ];

  const GetQuarterAmount = async () => {
    try {
      const response = await authAxiosInstance.get(
        `/accounting/user/AcashFixManage/quarterly/`,
        {
          params: {
            DIV_CD: DIV_CD,
            inputYear: inputYear,
            DISP_SQ: DISP_SQ,
          },
        }
      );

      setQuarterlyAmount(response.data);
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  useEffect(() => {
    GetQuarterAmount();
  }, [inputYear, DISP_SQ, DIV_CD]);

  const RenderCustomLegend = ({ payload }) => {
    return (
      <div>
        {payload.slice(0, 2).map((entry, index) => (
          <span
            key={`item-${index}`}
            style={{
              display: 'inline-block',
              marginLeft: '30px',
              marginRight: '10px',
              marginBottom: '10px',
            }}
          >
            <span style={{ color: entry.color }}>■</span> {entry.value}
          </span>
        ))}
        <br />
        {payload.slice(2).map((entry, index) => (
          <span
            key={`item-${index}`}
            style={{
              display: 'inline-block',
              marginLeft: '30px',
              marginRight: '10px',
              marginBottom: '10px',
            }}
          >
            <span style={{ color: entry.color }}>■</span> {entry.value}
          </span>
        ))}
      </div>
    );
  };

  const handleYearChange = e => {
    setInputYear(e.target.value);
  };

  const renderPieCharts = () => {
    if (!quarterlyAmount || quarterlyAmount.length === 0) return null;

    return quarterlyAmount.map((data, index) => {
      const pieData = Object.entries(data)
        .filter(([key]) => !['QUARTER', 'TOTAL_AMOUNT'].includes(key))
        .map(([key, value]) => ({ name: key, value }));

      return (
        <div key={index} style={{ margin: '0 40px' }}>
          <PieChart width={230} height={240}>
            <text
              x={125}
              y={20}
              textAnchor="middle"
              verticalAnchor="middle"
              fontWeight="bold"
            >
              {`${data.QUARTER}분기`}
            </text>
            <Pie
              data={pieData}
              cx={125}
              cy={90}
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((_, pieIndex) => (
                <Cell
                  key={`cell-${pieIndex}`}
                  fill={COLORS[pieIndex % COLORS.length]}
                />
              ))}
            </Pie>
            <text x={125} y={170} textAnchor="middle" verticalAnchor="middle">
              {`총 금액: ${data.TOTAL_AMOUNT.toLocaleString()}원`}
            </text>

            <Legend
              verticalAlign="bottom"
              height={36}
              content={<RenderCustomLegend />}
            />
            <Tooltip />
          </PieChart>
        </div>
      );
    });
  };

  return (
    <>
      <DateSelectBox
        type={'year'}
        value={inputYear}
        onChange={handleYearChange}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {renderPieCharts()}
      </div>
    </>
  );
};

export default FixedQuarterChart;
