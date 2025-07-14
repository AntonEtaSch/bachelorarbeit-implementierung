'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import TotalHobsChart from './TotalHobsChart';

interface MonthlyData {
  calendarDate: string;
  numberOfHOBs: number;
  numberOfBloodCultureSamples: number; // divided by 10 for reference to total hobs
  numberOfPatientDays: number; // divided by 1000
  bcRate: number;
  hobRate: number;
}

interface RawData {
  hobType: string;
  periodType: string;
  calendarDateStart: string;
  calendarDateEnd: string;
  wardGroupType: string;
  wardGroupValue: string;
  numberOfHOBs: string;
  numberOfBloodCultureSamples: string;
  numberOfPatientDays: string;
  bcRate: string;
  hobRate: string;
}

interface Props {
  startDate: string;
  endDate: string;
  hospital: string;
  wardGroupType: string;
  wardGroupValue: string;
  compare: boolean;
  hospitalCompare: string;
  wardGroupTypeCompare: string;
  wardGroupValueCompare: string;
  hobType: string;
  rateSwitch: boolean;
}

const CustomLineChart = ({
  startDate,
  endDate,
  hospital,
  wardGroupType,
  wardGroupValue,
  compare,
  hospitalCompare,
  wardGroupTypeCompare,
  wardGroupValueCompare,
  hobType,
  rateSwitch,
}: Props) => {
  const [chartData, setChartData] = useState<MonthlyData[]>([]);
  const [chartDataCompare, setChartDataCompare] = useState<MonthlyData[]>([]);
  // const [loading, setLoading] = useState(false);
  let noData = false;

  useEffect(() => {
    const loadData = async () => {
      try {
        let queryParams = `?hospital=${hospital}`;
        queryParams += `&hobType=${hobType}`;
        queryParams += `&calendarDateStart=${startDate}`;
        queryParams += `&calendarDateEnd=${endDate}`;
        if (wardGroupType == 'Alle') queryParams += `&wardGroupType=HOSPITAL`;
        else {
          if (wardGroupValue != 'Alle')
            queryParams += `&wardGroupType=${wardGroupType}`;
          else queryParams += `&wardGroupType=HOSPITAL`;
        }
        if (wardGroupValue == 'Alle') {
          queryParams += `&wardGroupValue=HOSPITAL`;
        } else queryParams += `&wardGroupValue=${wardGroupValue}`;
        const res = await fetch(
          `http://localhost:3000/api/hob-rates` + queryParams
        );
        if (!res.ok) throw new Error(`HTTP Fehler! Status ${res.status}`);
        const rows: RawData[] = await res.json();

        setChartData(
          rows.map((raw) => ({
            calendarDate: raw.calendarDateStart.slice(3),
            numberOfHOBs: parseInt(raw.numberOfHOBs),
            numberOfBloodCultureSamples:
              parseInt(raw.numberOfBloodCultureSamples) / 10,
            numberOfPatientDays: parseInt(raw.numberOfPatientDays) / 1000,
            bcRate: parseFloat(raw.bcRate),
            hobRate: parseFloat(raw.hobRate),
          }))
        );
      } catch (err) {
        noData = true;
        console.log('Fehler beim Lesen der Daten:', err);
      }
    };
    const loadDataCompare = async () => {
      // only load comparison data if needed
      if (!compare) return;
      try {
        let queryParams = `?hospital=${hospitalCompare}`;
        queryParams += `&hobType=${hobType}`;
        queryParams += `&calendarDateStart=${startDate}`;
        queryParams += `&calendarDateEnd=${endDate}`;
        if (wardGroupTypeCompare == 'Alle')
          queryParams += `&wardGroupType=HOSPITAL`;
        else {
          if (wardGroupValueCompare != 'Alle')
            queryParams += `&wardGroupType=${wardGroupTypeCompare}`;
          else queryParams += `&wardGroupType=HOSPITAL`;
        }
        if (wardGroupValueCompare == 'Alle') {
          queryParams += `&wardGroupValue=HOSPITAL`;
        } else queryParams += `&wardGroupValue=${wardGroupValueCompare}`;
        const res = await fetch(
          `http://localhost:3000/api/hob-rates` + queryParams
        );
        if (!res.ok) throw new Error(`HTTP Fehler! Status ${res.status}`);
        const rows: RawData[] = await res.json();

        setChartDataCompare(
          rows.map((raw) => ({
            calendarDate: raw.calendarDateStart.slice(3),
            numberOfHOBs: parseInt(raw.numberOfHOBs),
            numberOfBloodCultureSamples:
              parseInt(raw.numberOfBloodCultureSamples) / 10,
            numberOfPatientDays: parseInt(raw.numberOfPatientDays) / 1000,
            bcRate: parseFloat(raw.bcRate),
            hobRate: parseFloat(raw.hobRate),
          }))
        );
      } catch (err) {
        noData = true;
        console.log('Fehler beim Lesen der Daten:', err);
      }
    };
    loadData();
    loadDataCompare();
  }, [
    startDate,
    endDate,
    wardGroupType,
    wardGroupValue,
    hobType,
    hospital,
    compare,
    hospitalCompare,
    wardGroupTypeCompare,
    wardGroupValueCompare,
  ]);

  const hobRateChart = (
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
          dataKey="bcRate"
          stroke="#000000"
        />
      )}
    </LineChart>
  );

  return (
    <>
      {rateSwitch ? (
        <TotalHobsChart
          compare={compare}
          chartDataFirst={chartData}
          chartDataCompare={chartDataCompare}
        ></TotalHobsChart>
      ) : (
        <p>rate chart</p>
      )}
    </>
  );
};

export default CustomLineChart;
