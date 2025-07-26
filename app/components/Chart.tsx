// Chartkomponente mit API zugriff
// aufgeteilt in Chart für HOB-Raten und Anzahl an HOBs

'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import TotalHobsChart from './TotalHobsChart';
import HobrateChart from './HobrateChart';
import { RawData, MonthlyData } from '../types/ChartData';
import { RawPercentileData, MonthlyPercentileData } from '../types/ChartData';
import { ChartProps } from '../types/ChartProps';

const Chart = ({
  startDate, // relevante für selektieren der Daten
  endDate, // "
  hospital, // "
  wardGroupType, // "
  wardGroupValue, // "
  compare, // falls vergleich stattfinden soll
  hospitalCompare, // selektieren der vergleichsdaten
  wardGroupTypeCompare, // "
  wardGroupValueCompare, // "
  hobType, // filern der daten
  rateSwitch, // entscheidet welcher chart
  percentileSelect,
}: ChartProps) => {
  const [chartData, setChartData] = useState<MonthlyData[]>([]);
  const [chartDataCompare, setChartDataCompare] = useState<MonthlyData[]>([]);

  const [p75Line, setP75Line] = useState<MonthlyPercentileData[]>([]);
  const [p85Line, setP85Line] = useState<MonthlyPercentileData[]>([]);
  const [p95Line, setP95Line] = useState<MonthlyPercentileData[]>([]);

  useEffect(
    () => {
      const loadData = async () => {
        // Zugriff auf daten in Format wie in datei gespeichert
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

          // daten aufbereiten
          setChartData(
            rows.map((raw) => ({
              calendarDate: raw.calendarDateStart.slice(3),
              numberOfHOBs: parseInt(raw.numberOfHOBs),
              numberOfBloodCultureSamples: parseInt(
                raw.numberOfBloodCultureSamples
              ),
              numberOfPatientDays: parseInt(raw.numberOfPatientDays),
              bcRate: raw.bcRate
                ? Math.round(parseFloat(raw.bcRate) * 100) / 100
                : 0,
              hobRate: raw.hobRate
                ? Math.round(parseFloat(raw.hobRate) * 100) / 100
                : 0,
            }))
          );
        } catch (err) {
          console.log('Fehler beim Lesen der Daten:', err);
        }
      };

      // selbes für vergleichsdaten
      const loadDataCompare = async () => {
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
              numberOfBloodCultureSamples: parseInt(
                raw.numberOfBloodCultureSamples
              ),
              numberOfPatientDays: parseInt(raw.numberOfPatientDays),
              bcRate: raw.bcRate
                ? Math.round(parseFloat(raw.bcRate) * 100) / 100
                : 0,
              hobRate: raw.hobRate
                ? Math.round(parseFloat(raw.hobRate) * 100) / 100
                : 0,
            }))
          );
        } catch (err) {
          console.log('Fehler beim Lesen der Daten:', err);
        }
      };

      // selbes für perzentile
      const loadPercentile = async (p: string) => {
        try {
          let queryParams = `?hospital=${hospital}`;
          queryParams += `&hobType=${hobType}`;
          queryParams += `&calendarDateStart=${startDate}`;
          queryParams += `&calendarDateEnd=${endDate}`;
          queryParams += `&percentile=${p}`;
          const res = await fetch(
            `http://localhost:3000/api/hob-rates` + queryParams
          );
          if (!res.ok) throw new Error(`HTTP Fehler! Status ${res.status}`);
          const rows: RawPercentileData[] = await res.json();

          if (p == 'p75') {
            setP75Line(
              rows.map((raw) => ({
                calendarDate: raw.calendarDateStart.slice(3),
                hobRate: raw.hobRate
                  ? Math.round(parseFloat(raw.hobRate) * 100) / 100
                  : 0,
              }))
            );
          } else if (p == 'p85') {
            setP85Line(
              rows.map((raw) => ({
                calendarDate: raw.calendarDateStart.slice(3),
                hobRate: raw.hobRate
                  ? Math.round(parseFloat(raw.hobRate) * 100) / 100
                  : 0,
              }))
            );
          } else if (p == 'p95') {
            setP95Line(
              rows.map((raw) => ({
                calendarDate: raw.calendarDateStart.slice(3),
                hobRate: raw.hobRate
                  ? Math.round(parseFloat(raw.hobRate) * 100) / 100
                  : 0,
              }))
            );
          }
        } catch (err) {
          console.log('Fehler beim Lesen der Perzentile:', err);
        }
      };
      loadData();
      if (compare) loadDataCompare();
      // gewünschte perzentile laden falls passend
      const possible = hospital != 'Alle';
      if (percentileSelect[0] && possible) loadPercentile('p75');
      if (percentileSelect[1] && possible) loadPercentile('p85');
      if (percentileSelect[2] && possible) loadPercentile('p95');
    }, //  falls sich etwas ändert, neu abrufen
    [
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
      percentileSelect,
    ]
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
        <HobrateChart
          compare={compare}
          chartDataFirst={chartData}
          chartDataCompare={chartDataCompare}
          p75={p75Line}
          p85={p85Line}
          p95={p95Line}
          showP75={percentileSelect[0] && !compare && hospital != 'Alle'}
          showP85={percentileSelect[1] && !compare && hospital != 'Alle'}
          showP95={percentileSelect[2] && !compare && hospital != 'Alle'}
        ></HobrateChart>
      )}
    </>
  );
};

export default Chart;
