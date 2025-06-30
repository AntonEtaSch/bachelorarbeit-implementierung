import React from 'react';
import Zeitraum from './Zeitraum';
import Einrichtung from './Einrichtung';
import HobTypeSelect from './HobTypeSelect';

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
  hobType: string;
  setHobType: (s: string) => void;
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
  hobType,
  setHobType,
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
      <HobTypeSelect hobType={hobType} setHobType={setHobType}></HobTypeSelect>
    </div>
  );
};

export default Auswahl;
