// Komponente um Zeitraum dynamisch anzupassen
// interagiert mit TimerangeSelection über dem Chart

'use client';

import React, { useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import { TimerangeProps } from '../types/SelectionProps';

// hilfsfunktion string (datum) zu nummer (für slider)
function stringToNumber(s: string): number {
  return parseInt(s.slice(2)) * 12 + parseInt(s.slice(0, 2));
}

// hilfsfunktion nummer zu string
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
}: TimerangeProps) => {
  const [startSlider, setStartSlider] = useState<string>('102022');
  const [endSlider, setEndSlider] = useState<string>('122024');

  // slider bei änderung des zeitraumes akutalisieren
  useEffect(() => {
    setStartSlider(startMonth);
    setEndSlider(endMonth);
  }, [startMonth, endMonth]);

  return (
    <div>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={[stringToNumber(startSlider), stringToNumber(endSlider)]}
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
        // begrenzte prototypische range
        min={stringToNumber('102022')}
        max={stringToNumber('122024')}
        // angepasstes label
        valueLabelFormat={(val) => {
          const s = numberToString(val);
          return s.slice(0, 2) + '/' + s.slice(2);
        }}
        valueLabelDisplay="auto"
        disableSwap
      />
      <div className="text-center text-lg">Zeitraum Anpassen</div>
    </div>
  );
};

export default RangeSlider;
