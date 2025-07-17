// Chartkomponente mit API zugriff
// aufgeteilt in Chart für HOB-Raten und Anzahl an HOBs

'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import TotalHobsChart from './TotalHobsChart';
import HobrateChart from './HobrateChart';
import { RawData } from '../types/ChartData';
import { MonthlyData } from '../types/ChartData';
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
}: ChartProps) => {
  const [chartData, setChartData] = useState<MonthlyData[]>([]);
  const [chartDataCompare, setChartDataCompare] = useState<MonthlyData[]>([]);

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
        // only load comparison data if needed
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
              bcRate: raw.bcRate ? parseFloat(raw.bcRate) : 0,
              hobRate: raw.hobRate ? parseFloat(raw.hobRate) : 0,
            }))
          );
        } catch (err) {
          console.log('Fehler beim Lesen der Daten:', err);
        }
      };
      loadData();
      if (compare) loadDataCompare();
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
    ]
  );

  return (
    <>
      {/* je nach switch passenden chart */}
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
        ></HobrateChart>
      )}
    </>
  );
};

export default Chart;
