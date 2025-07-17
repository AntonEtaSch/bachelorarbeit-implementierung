// Auswahlkomponente oberhalb des Charts inklusive Einrichtung, Zeitraum, Hobtype, Rateswitch

import React from 'react';
import TimerangeSelection from './TimerangeSelection';
import EnvironmentSelection from './EnvironmentSelection';
import HobTypeSelect from './HobTypeSelect';
import RateSwitch from './RateSwitch';
import { Stack } from '@mui/material';
import { completeSelectionProps } from '../types/SelectionProps';

const Selection = ({
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
}: completeSelectionProps) => {
  return (
    <div>
      <EnvironmentSelection
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
      ></EnvironmentSelection>
      <TimerangeSelection
        startMonth={startMonth}
        endMonth={endMonth}
        setStartMonth={setStartMonth}
        setEndMonth={setEndMonth}
      ></TimerangeSelection>
      <div className="my-3">
        Ansicht Auswählen
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

export default Selection;
