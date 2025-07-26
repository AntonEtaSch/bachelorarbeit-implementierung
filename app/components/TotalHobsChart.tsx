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

  // angepasster tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const fullData = payload[0]?.payload;
    return (
      <div
        style={{
          background: '#333',
          color: '#fff',
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        <div>
          {' '}
          <strong>{label}</strong>{' '}
        </div>
        <div>HOBs: {fullData.numberOfHOBs}</div>
        <div>Blutkulturabnahmen: {fullData.numberOfBloodCultureSamples}</div>
        <div>Patiententage: {fullData.numberOfPatientDays}</div>
        {/* Falls verglichen wird tooltip erweitern */}
        {compare && (
          <>
            <strong>Vergleich</strong>
            <div>HOBs: {fullData.numberOfHobsCompared}</div>
            <div>
              Blutkulturabnahmen: {fullData.numberOfBloodCultureSamplesCompared}
            </div>
            <div>Patiententage: {fullData.numberOfPatientDaysCompared}</div>
          </>
        )}
      </div>
    );
  };

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
          numberOfPatientDaysCompared:
            chartDataCompare[index]?.numberOfPatientDays ?? null,
          numberOfBloodCultureSamplesCompared:
            chartDataCompare[index]?.numberOfBloodCultureSamples ?? null,
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
      <Tooltip content={CustomTooltip} />
      <Legend />
      {true && (
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="numberOfHOBs"
          stroke="#6A5ACD"
          strokeWidth={2.4}
          dot={{ fill: '#6A5ACD', r: 2.6 }}
        />
      )}
      {compare && (
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="numberOfHobsCompared"
          stroke="#A31545"
          strokeWidth={2.4}
          dot={{ fill: '#A31545', r: 2.6 }}
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
