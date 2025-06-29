import React from 'react';
import Zeitraum from './Zeitraum';
import Einrichtung from './Einrichtung';

interface Props {
  startMonth: string;
  endMonth: string;
  setStartMonth: (date: string) => void;
  setEndMonth: (date: string) => void;
  hospital: string;
  wardGroupType: string;
  wardGroup: string;
  setHospital: (s: string) => void;
  setWardGroupType: (s: string) => void;
  setWardGroup: (s: string) => void;
}

const Auswahl = ({
  startMonth,
  endMonth,
  setStartMonth,
  setEndMonth,
  hospital,
  wardGroupType,
  wardGroup,
  setHospital,
  setWardGroupType,
  setWardGroup,
}: Props) => {
  return (
    <div>
      <Einrichtung
        hospital={hospital}
        wardGroupType={wardGroupType}
        wardGroup={wardGroup}
        setHospital={setHospital}
        setWardGroupType={setWardGroupType}
        setWardGroup={setWardGroup}
      ></Einrichtung>
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
