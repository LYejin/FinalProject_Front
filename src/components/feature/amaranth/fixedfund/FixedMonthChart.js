import React, { useEffect, useState } from 'react';
import { authAxiosInstance } from '../../../../axios/axiosInstance';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const FixedMonthChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMonthAmount = async () => {
      try {
        const response = await authAxiosInstance.get(
          `/accounting/user/AcashFixManage/monthly/`,
          {
            params: {
              DIV_CD: '5555',
              CO_CD: '1004',
              inputYear: '2023',
              DISP_SQ: '1',
            },
          }
        );

        const formattedData = response.data.map(entry => {
          const entries = Object.entries(entry)
            .filter(([key]) => key !== 'MONTH' && key !== 'TOTAL_AMOUNT')
            .sort((a, b) => b[1] - a[1]);

          const newData = {
            MONTH: entry.MONTH,
            'Top 1': entries[0] ? entries[0][1] : 0,
            'Top 2': entries[1] ? entries[1][1] : 0,
            'Top 3': entries[2] ? entries[2][1] : 0,
            나머지:
              entry.TOTAL_AMOUNT -
              (entries[0] ? entries[0][1] : 0) -
              (entries[1] ? entries[1][1] : 0) -
              (entries[2] ? entries[2][1] : 0),
          };

          return newData;
        });

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching monthly data:', error);
      }
    };

    fetchMonthAmount();
  }, []);

  const renderTooltip = props => {
    if (props.active && props.payload && props.payload.length) {
      const data = props.payload[0].payload;
      let totalAmount = 0;

      const entries = Object.entries(data)
        .filter(
          ([key]) =>
            key !== 'MONTH' && key !== 'TOTAL_AMOUNT' && key !== '나머지'
        )
        .sort((a, b) => b[1] - a[1]);

      return (
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '10px',
          }}
        >
          <p>
            <strong>{` ${data['MONTH']}월`}</strong>
          </p>
          <p>
            <strong>{`총 금액: ${totalAmount + data['나머지']}`}</strong>
          </p>
          {entries.map(([key, value], idx) => {
            totalAmount += value;
            return <p key={idx}>{`${key}: ${value}`}</p>;
          })}
          <p>{`나머지: ${data['나머지']}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="MONTH" tickFormatter={tickItem => `${tickItem}월`} />
        <YAxis tickFormatter={tickItem => `${tickItem}원`} />
        <Tooltip content={renderTooltip} />
        {data.length > 0 &&
          Object.keys(data[0]).map((key, idx) => {
            if (key !== 'MONTH' && key !== 'TOTAL_AMOUNT' && key !== '나머지') {
              return (
                <Bar
                  key={idx}
                  dataKey={key}
                  stackId="a"
                  fill={['#8884d8', '#82ca9d', '#ffc658'][idx % 3]}
                />
              );
            }
            return null;
          })}
        <Bar dataKey="나머지" stackId="a" fill="#d88484" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FixedMonthChart;
