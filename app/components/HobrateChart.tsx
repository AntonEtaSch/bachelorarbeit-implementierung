import React, { useEffect, useState } from 'react';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts';

interface MonthlyData {
  calendarDate: string;
  numberOfHOBs: number;
  numberOfBloodCultureSamples: number; // divided by 10 for reference to total hobs
  numberOfPatientDays: number; // divided by 1000
  bcRate: number;
  hobRate: number;
  numberOfHobsCompared?: number;
}

interface Props {
  compare: boolean;
  chartDataFirst: MonthlyData[];
  chartDataCompare: MonthlyData[];
}

const HobrateChart = ({ compare, chartDataFirst, chartDataCompare }: Props) => {
  const [chartData, setChartData] = useState<MonthlyData[]>(chartDataFirst);

  useEffect(() => {
    if (compare) {
      setChartData(
        chartDataFirst.map((itemDataFirst, index) => ({
          calendarDate: itemDataFirst.calendarDate,
          numberOfHOBs: itemDataFirst.numberOfHOBs,
          numberOfBloodCultureSamples:
            itemDataFirst.numberOfBloodCultureSamples,
          numberOfPatientDays: itemDataFirst.numberOfPatientDays,
          bcRate: itemDataFirst.bcRate,
          hobRate: itemDataFirst.hobRate,
          hobRateCompared: chartDataCompare[index]?.hobRate ?? null,
        }))
      );
    } else {
      setChartData(chartDataFirst);
    }
  }, [chartDataFirst, chartDataCompare]);

  const totalHobsChart = (
    <LineChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="calendarDate" />
      <YAxis />
      <Tooltip />
      <Legend />
      {true && (
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="hobRate"
          stroke="#8884d8"
        />
      )}
      {true && (
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="hobRateCompared"
          stroke="#82ca9d"
        />
      )}
      {false && (
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="numberOfPatientDays"
          stroke="#82ca9d"
        />
      )}
      {false && (
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="numberOfBloodCultureSamples"
          stroke="#000000"
        />
      )}
    </LineChart>
  );

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        {totalHobsChart}
      </ResponsiveContainer>
    </>
  );
};

export default HobrateChart;
