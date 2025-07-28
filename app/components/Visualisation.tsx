// Gesamte Visualisierungskomponente inklusive Auswahl, Chart und Slider für Zeitraum

'use client';
import React from 'react';
import { useState } from 'react';
import Selection from './Selection';
import RangeSlider from './RangeSlider';
import Chart from './Chart';

const Visualisation = () => {
  // Auswahl des Zeitraums speichern
  const [startMonth, setStartMonth] = useState<string>('102022');
  const [endMonth, setEndMonth] = useState<string>('122024');
  // Auswahl der betrachteten Einrichtung speichern
  const [hospital, setHospital] = useState<string>('Alle');
  const [wardGroupType, setWardGroupType] = useState<string>('');
  const [wardGroup, setWardGroup] = useState<string>('');
  // Auswahl der verglichenen Einrichtung speichern
  const [compare, setCompare] = useState<boolean>(false);
  const [hospitalCompare, setHospitalCompare] = useState<string>('Alle');
  const [wardGroupTypeCompare, setWardGroupTypeCompare] = useState<string>('');
  const [wardGroupCompare, setWardGroupCompare] = useState<string>('');
  // Auswahl von hobType und Ansicht rate/totate Anzahl speichern
  const [hobType, setHobType] = useState<string>('ALL');
  const [rateSwitch, setRateSwitch] = useState<boolean>(false); // true => total, false => rate
  const [percentileSelect, setPercentileSelect] = useState<boolean[]>([
    true,
    true,
    true,
  ]);

  // Besteht Grundsätzlich aus Selection, Chart und Slider für dynamischen Zeitraum
  return (
    <div className="mr-10">
      <div className="ml-10">
        <Selection
          startMonth={startMonth}
          setStartMonth={setStartMonth}
          endMonth={endMonth}
          setEndMonth={setEndMonth}
          hospital={hospital}
          setHospital={setHospital}
          wardGroupType={wardGroupType}
          setWardGroupType={setWardGroupType}
          wardGroup={wardGroup}
          setWardGroup={setWardGroup}
          compare={compare}
          setCompare={setCompare}
          hospitalCompare={hospitalCompare}
          setHospitalCompare={setHospitalCompare}
          wardGroupTypeCompare={wardGroupTypeCompare}
          setWardGroupTypeCompare={setWardGroupTypeCompare}
          wardGroupCompare={wardGroupCompare}
          setWardGroupCompare={setWardGroupCompare}
          hobType={hobType}
          setHobType={setHobType}
          rateSwitch={rateSwitch}
          setRateSwitch={setRateSwitch}
          percentileSelect={percentileSelect}
          setPercentileSelect={setPercentileSelect}
        ></Selection>
      </div>
      <Chart
        startDate={startMonth}
        endDate={endMonth}
        hospital={hospital}
        wardGroupType={wardGroupType}
        wardGroupValue={wardGroup}
        compare={compare}
        hospitalCompare={hospitalCompare}
        wardGroupTypeCompare={wardGroupTypeCompare}
        wardGroupValueCompare={wardGroupCompare}
        hobType={hobType}
        rateSwitch={rateSwitch}
        percentileSelect={percentileSelect}
      ></Chart>
      <div className="ml-10">
        <RangeSlider
          startMonth={startMonth}
          endMonth={endMonth}
          setStartMonth={setStartMonth}
          setEndMonth={setEndMonth}
        ></RangeSlider>
      </div>
    </div>
  );
};

export default Visualisation;
