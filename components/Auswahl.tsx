import React from 'react';
import Zeitraum from './Zeitraum';
import Einrichtung from './Einrichtung';
import HobTypeSelect from './HobTypeSelect';
import RateSwitch from './RateSwitch';
import { Stack } from '@mui/material';

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
  compare: boolean;
  setCompare: (b: boolean) => void;
  hospitalCompare: string;
  setHospitalCompare: (s: string) => void;
  wardGroupTypeCompare: string;
  setWardGroupTypeCompare: (s: string) => void;
  wardGroupCompare: string;
  setWardGroupCompare: (s: string) => void;
  hobType: string;
  setHobType: (s: string) => void;
  rateSwitch: boolean;
  setRateSwitch: (b: boolean) => void;
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
  compare,
  setCompare,
  hospitalCompare,
  setHospitalCompare,
  wardGroupTypeCompare,
  setWardGroupTypeCompare,
  wardGroupCompare,
  setWardGroupCompare,
  hobType,
  setHobType,
  rateSwitch,
  setRateSwitch,
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
        compare={compare}
        setCompare={setCompare}
        hospitalCompare={hospitalCompare}
        setHospitalCompare={setHospitalCompare}
        wardGroupTypeCompare={wardGroupTypeCompare}
        setWardGroupTypeCompare={setWardGroupTypeCompare}
        wardGroupCompare={wardGroupCompare}
        setWardGroupCompare={setWardGroupCompare}
      ></Einrichtung>
      <Zeitraum
        startMonth={startMonth}
        endMonth={endMonth}
        setStartMonth={setStartMonth}
        setEndMonth={setEndMonth}
      ></Zeitraum>
      <div className="my-3">
        Ansicht Auswählen
        {rateSwitch && <> On</>}
        {!rateSwitch && <> Off</>}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <div className="mr-5">
            <HobTypeSelect
              hobType={hobType}
              setHobType={setHobType}
            ></HobTypeSelect>
          </div>
          <RateSwitch
            rateSwitch={rateSwitch}
            setRateSwitch={setRateSwitch}
          ></RateSwitch>
        </Stack>
      </div>
    </div>
  );
};

export default Auswahl;
