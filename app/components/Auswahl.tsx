import React from 'react';
import Zeitraum from './Zeitraum';

interface Props {
  startMonth: String;
  endMonth: String;
  setStartMonth: (date: String) => void;
  setEndMonth: (date: String) => void;
}

const Auswahl = ({
  startMonth,
  endMonth,
  setStartMonth,
  setEndMonth,
}: Props) => {
  return (
    <div>
      Auswahl
      <Zeitraum
        startMonth={startMonth}
        endMonth={endMonth}
        setStartMonth={setStartMonth}
        setEndMonth={setEndMonth}
      ></Zeitraum>
    </div>
  );
};

export default Auswahl;
