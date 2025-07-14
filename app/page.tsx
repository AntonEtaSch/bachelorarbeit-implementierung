'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import CustomLineChart from '../components/CustomLineChart';
import Auswahl from '../components/Auswahl';
import RangeSlider from '../components/RangeSlider';

export default function Home() {
  // Zeitraum
  const [startMonth, setStartMonth] = useState<string>('102022');
  const [endMonth, setEndMonth] = useState<string>('122024');
  // Einrichtung
  const [hospital, setHospital] = useState<string>('Alle');
  const [wardGroupType, setWardGroupType] = useState<string>('Alle');
  const [wardGroup, setWardGroup] = useState<string>('Alle');
  // Vergleich
  const [compare, setCompare] = useState<boolean>(false);
  const [hospitalCompare, setHospitalCompare] = useState<string>('Alle');
  const [wardGroupTypeCompare, setWardGroupTypeCompare] =
    useState<string>('Alle');
  const [wardGroupCompare, setWardGroupCompare] = useState<string>('Alle');
  // Ansicht
  const [hobType, setHobType] = useState<string>('ALL');
  const [rateSwitch, setRateSwitch] = useState<boolean>(false); // true => total, false => rate

  return (
    <div className="mr-10">
      <div className="ml-10">
        <Auswahl
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
        ></Auswahl>
      </div>
      <CustomLineChart
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
      ></CustomLineChart>
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
}
