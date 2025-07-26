// Komponente mit HOB-Rate Chart

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
import { MonthlyData, MonthlyPercentileData } from '../types/ChartData';

interface Props {
  compare: boolean;
  chartDataFirst: MonthlyData[];
  chartDataCompare: MonthlyData[];
  p75: MonthlyPercentileData[];
  p85: MonthlyPercentileData[];
  p95: MonthlyPercentileData[];
  showP75: boolean;
  showP85: boolean;
  showP95: boolean;
}

const getP = (Month: MonthlyData, P: MonthlyPercentileData[]) => {
  const lookForMonth = Month.calendarDate;
  for (let i = 0; i < P.length; i++) {
    if (P[i].calendarDate == lookForMonth) return P[i].hobRate;
  }
  return 0;
};

const HobrateChart = ({
  compare,
  chartDataFirst,
  chartDataCompare,
  p75,
  p85,
  p95,
  showP75,
  showP85,
  showP95,
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
        <div>HOB-Rate: {fullData.hobRate}</div>
        <div>Blutkulturabnahme-Rate: {fullData.bcRate}</div>
        <div>HOBs: {fullData.numberOfHOBs}</div>
        {/* Falls verglichen wird tooltip erweitern */}
        {compare && (
          <>
            <strong>Vergleich</strong>
            <div>HOB-Rate: {fullData.hobRateCompared}</div>
            <div>Blutkulturabnahme-Rate: {fullData.bcRateCompared}</div>
            <div>HOBs: {fullData.numberOfHobsCompared}</div>
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
          hobRateCompared: chartDataCompare[index]?.hobRate ?? null,
          bcRateCompared: chartDataCompare[index]?.bcRate ?? null,
          numberOfHobsCompared: chartDataCompare[index]?.numberOfHOBs ?? null,
        }))
      );
    } else {
      setChartData(
        chartDataFirst.map((Month) => ({
          ...Month,
          p75Value: getP(Month, p75),
          p85Value: getP(Month, p85),
          p95Value: getP(Month, p95),
        }))
      );
    }
  }, [chartDataFirst, chartDataCompare, p75, p85, p95]);

  const totalHobsChart = (
    <LineChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="calendarDate" />
      <YAxis />
      <Tooltip content={CustomTooltip} />
      <Legend />

      {compare && (
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="hobRateCompared"
          stroke="#A31545"
          name="VergleichsHOB-Rate"
          strokeWidth={2.4}
          dot={{ fill: '#A31545', r: 2.6 }}
        />
      )}
      {showP75 && (
        <Line
          isAnimationActive={false}
          activeDot={false}
          type="monotone"
          dataKey="p75Value"
          stroke="#FF5733D9"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="75. Perzentil"
          dot={{ r: 0 }}
        />
      )}
      {showP85 && (
        <Line
          isAnimationActive={false}
          activeDot={false}
          type="monotone"
          dataKey="p85Value"
          stroke="#C70039D9"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="85. Perzentil"
          dot={{ r: 0 }}
        />
      )}
      {showP95 && (
        <Line
          isAnimationActive={false}
          activeDot={false}
          type="monotone"
          dataKey="p95Value"
          stroke="#800020D9"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="95. Perzentil"
          dot={{ r: 0 }}
        />
      )}
      {true && (
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="hobRate"
          stroke="#6A5ACD"
          strokeWidth={2.4}
          name="HOB-Rate"
          dot={{ fill: '#6A5ACD', r: 2.6 }}
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
