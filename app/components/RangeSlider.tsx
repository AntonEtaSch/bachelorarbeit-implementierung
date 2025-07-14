'use client';

import React, { useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import { Dawning_of_a_New_Day } from 'next/font/google';

interface Props {
  startMonth: string;
  endMonth: string;
  setStartMonth: (date: string) => void;
  setEndMonth: (date: string) => void;
}

function dateToString(input: Date): string {
  let newDate = '' + (input.getMonth() + 1) + input.getFullYear();
  if (newDate.length == 5) {
    newDate = '0' + newDate;
  }
  return newDate;
}

function stringToNumber(s: string): number {
  return parseInt(s.slice(2)) * 12 + parseInt(s.slice(0, 2));
}

function numberToString(n: number): string {
  let month = ('' + (n % 12)).padStart(2, '0');
  let year = ('' + Math.floor(n / 12)).padStart(4, '0');

  if (month == '00') {
    month = '12';
    year = ('' + (Math.floor(n / 12) - 1)).padStart(4, '0');
  }
  return month + year;
}

const RangeSlider = ({
  startMonth,
  endMonth,
  setStartMonth,
  setEndMonth,
}: Props) => {
  const [startSlider, setStartSlider] = useState<string>('102022');
  const [endSlider, setEndSlider] = useState<string>('122024');

  useEffect(() => {
    setStartSlider(startMonth);
    setEndSlider(endMonth);
  }, [startMonth, endMonth]);

  return (
    <div>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={[
          parseInt(startSlider.slice(2), 10) * 12 +
            parseInt(startSlider.slice(0, 2), 10),
          parseInt(endSlider.slice(2), 10) * 12 +
            parseInt(endSlider.slice(0, 2), 10),
        ]}
        onChangeCommitted={() => {
          setStartMonth(startSlider);
          setEndMonth(endSlider);
        }}
        onChange={(e, inValue) => {
          if (inValue) {
            setStartSlider(numberToString(inValue[0]));
            setEndSlider(numberToString(inValue[1]));
          }
        }}
        min={stringToNumber('102022')}
        max={stringToNumber('122024')}
        valueLabelFormat={(val) => {
          let s = numberToString(val);
          return s.slice(0, 2) + '/' + s.slice(2);
        }}
        valueLabelDisplay="auto"
        disableSwap
      />
    </div>
  );
};

export default RangeSlider;
