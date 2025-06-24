import React from 'react';
import MonthPicker from './MonthPicker';

interface Props {
  startMonth: String;
  endMonth: String;
  setStartMonth: (date: String) => void;
  setEndMonth: (date: String) => void;
}

const Zeitraum = ({
  startMonth,
  endMonth,
  setStartMonth,
  setEndMonth,
}: Props) => {
  return (
    <div>
      <p>Zeitraum Auswählen</p>
      <div className="my-3">
        <MonthPicker
          startMonth={startMonth}
          endMonth={endMonth}
          setEndMonth={setEndMonth}
          setStartMonth={setStartMonth}
        ></MonthPicker>
      </div>
    </div>
  );
};

export default Zeitraum;
