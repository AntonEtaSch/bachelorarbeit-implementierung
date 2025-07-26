// Auswahlkomponente oberhalb des Charts inklusive Einrichtung, Zeitraum, Hobtype, Rateswitch

import React from 'react';
import TimerangeSelection from './TimerangeSelection';
import EnvironmentSelection from './EnvironmentSelection';
import HobTypeSelect from './HobTypeSelect';
import RateSwitch from './RateSwitch';
import { Stack, Box } from '@mui/material';
import { completeSelectionProps } from '../types/SelectionProps';
import CheckPercentile from './CheckPercentile';

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
  percentileSelect,
  setPercentileSelect,
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
        <div className="mt-2">
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <HobTypeSelect
              hobType={hobType}
              setHobType={setHobType}
            ></HobTypeSelect>

            <RateSwitch
              rateSwitch={rateSwitch}
              setRateSwitch={setRateSwitch}
            ></RateSwitch>

            {/* <Box sx={{ flexGrow: 1 }} /> */}
            {!compare && !rateSwitch && hospital != 'Alle' && (
              <CheckPercentile
                percentileSelect={percentileSelect}
                setPercentileSelect={setPercentileSelect}
              ></CheckPercentile>
            )}
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Selection;
