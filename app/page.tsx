'use client';

import Image from 'next/image';
import CustomLineChart from './components/CustomLineChart';
import Auswahl from './components/Auswahl';
import { useEffect, useState } from 'react';

export default function Home() {
  const [startMonth, setStartMonth] = useState<string>('052023');
  const [endMonth, setEndMonth] = useState<string>('082024');

  return (
    <div className="mr-10">
      <div className="ml-10">
        <p>start: {startMonth}</p> <p>end: {endMonth}</p>
        <Auswahl
          startMonth={startMonth}
          endMonth={endMonth}
          setStartMonth={() => setStartMonth}
          setEndMonth={() => setEndMonth}
        ></Auswahl>
      </div>
      <CustomLineChart
        startDate={startMonth}
        endDate={endMonth}
        hobType=""
        wardGroupType="HOSPITAL"
        wardGroupValue=""
      ></CustomLineChart>
    </div>
  );
}
