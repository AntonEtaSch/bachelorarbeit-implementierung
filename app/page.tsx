'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import CustomLineChart from './components/CustomLineChart';
import Auswahl from './components/Auswahl';
import RangeSlider from './components/RangeSlider';

export default function Home() {
  const [startMonth, setStartMonth] = useState<string>('102022');
  const [endMonth, setEndMonth] = useState<string>('122024');

  const [hospital, setHospital] = useState<string>('Alle');
  const [wardGroupType, setWardGroupType] = useState<string>('Alle');
  const [wardGroup, setWardGroup] = useState<string>('Alle');

  return (
    <div className="mr-10">
      <div className="ml-10">
        <Auswahl
          hospital={hospital}
          wardGroupType={wardGroupType}
          wardGroup={wardGroup}
          setHospital={setHospital}
          setWardGroupType={setWardGroupType}
          setWardGroup={setWardGroup}
          startMonth={startMonth}
          endMonth={endMonth}
          setStartMonth={setStartMonth}
          setEndMonth={setEndMonth}
        ></Auswahl>
      </div>
      <CustomLineChart
        startDate={startMonth}
        endDate={endMonth}
        hobType=""
        wardGroupType={wardGroupType}
        wardGroupValue={wardGroup}
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
