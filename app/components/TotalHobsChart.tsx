// Komponente mit Chart totaler Anzahl der HOBs

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
import { MonthlyData } from '../types/ChartData';

interface Props {
  compare: boolean;
  chartDataFirst: MonthlyData[];
  chartDataCompare: MonthlyData[];
}

const TotalHobsChart = ({
  compare, // falls verglichen werden soll
  chartDataFirst, // daten der primären Einrichtung
  chartDataCompare, // vergleichsdaten
}: Props) => {
  const [chartData, setChartData] = useState<MonthlyData[]>(chartDataFirst);

  useEffect(() => {
    if (compare) {
      // bei vergleich -> kombiniere in einen datensatz
      setChartData(
        chartDataFirst.map((itemDataFirst, index) => ({
          calendarDate: itemDataFirst.calendarDate,
          numberOfHOBs: itemDataFirst.numberOfHOBs,
          numberOfBloodCultureSamples:
            itemDataFirst.numberOfBloodCultureSamples,
          numberOfPatientDays: itemDataFirst.numberOfPatientDays,
          bcRate: itemDataFirst.bcRate,
          hobRate: itemDataFirst.hobRate,
          numberOfHobsCompared: chartDataCompare[index]?.numberOfHOBs ?? null,
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
          dataKey="numberOfHOBs"
          stroke="#8884d8"
        />
      )}
      {compare && (
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="numberOfHobsCompared"
          stroke="#82ca9d"
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

export default TotalHobsChart;
