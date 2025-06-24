"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  useEffect(() => {
    const loadData = async () => {
      try {
        let queryParams = "?periodType=MONTHLY&hobType=ALL";
        queryParams += `&calendarDateStart=${startDate}`;
        queryParams += `&calendarDateEnd=${endDate}`;
        queryParams += `&wardGroupType=${wardGroupType}`;
        const res = await fetch(
          "http://localhost:3000/api/hob-rates" + queryParams
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
        console.log("Fehler beim Lesen der Daten:", err);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <div className="ml-10">
        CustomLineChart {wardGroupType} {startDate} {endDate}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="calendarDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          {<Line type="monotone" dataKey="numberOfHOBs" stroke="#8884d8" />}
          {
            <Line
              type="monotone"
              dataKey="numberOfPatientDays"
              stroke="#82ca9d"
            />
          }
          {
            <Line
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
