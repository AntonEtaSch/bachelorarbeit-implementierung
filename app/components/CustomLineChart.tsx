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
  startDate?: string;
  endDate?: string;
  hobType?: string;
  wardGroupType?: string;
  wardGroupValue?: string;
}

const CustomLineChart = ({
  startDate,
  endDate,
  hobType,
  wardGroupType,
  wardGroupValue,
}: Props) => {
  const [chartData, setChartData] = useState<MonthlyData[]>([]);
  // const [loading, setLoading] = useState(false);
  let noData = false;

  useEffect(() => {
    const loadData = async () => {
      try {
        let queryParams = `?hobType=${hobType}`;
        queryParams += `&calendarDateStart=${startDate}`;
        queryParams += `&calendarDateEnd=${endDate}`;
        if (wardGroupType == 'Alle') queryParams += `&wardGroupType=HOSPITAL`;
        else queryParams += `&wardGroupType=${wardGroupType}`;
        if (wardGroupValue == 'Alle') {
          if (wardGroupType == 'Alle')
            queryParams += `&wardGroupValue=HOSPITAL`;
          else queryParams += `&wardGroupValue=${wardGroupType}`;
        } else queryParams += `&wardGroupValue=${wardGroupValue}`;
        const res = await fetch(
          'http://localhost:3000/api/hob-rates-1' + queryParams
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
            hobRate: parseInt(raw.hobRate),
          }))
        );
      } catch (err) {
        noData = true;
        console.log('Fehler beim Lesen der Daten:', err);
      }
    };
    loadData();
  }, [startDate, endDate, wardGroupType, wardGroupValue, hobType]);

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="calendarDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          {
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="numberOfHOBs"
              stroke="#8884d8"
            />
          }
          {
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="numberOfPatientDays"
              stroke="#82ca9d"
            />
          }
          {
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="numberOfBloodCultureSamples"
              stroke="#000000"
            />
          }
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomLineChart;
