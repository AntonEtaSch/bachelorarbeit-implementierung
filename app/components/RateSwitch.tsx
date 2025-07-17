// Komponente um von HOB-Raten auf die Anzahl an HOBs zu wechseln

import React from 'react';
import { Stack, Typography, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

const handleSwitch = (
  RateSwitch: boolean,
  setRateSwitch: (b: boolean) => void
) => {
  setRateSwitch(!RateSwitch);
};

const CustomSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#666',
    opacity: 1,
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#666',
    opacity: 1,
  },
  '& .MuiSwitch-thumb': {
    color: '#9CA3AF',
  },
}));

interface Props {
  rateSwitch: boolean;
  setRateSwitch: (b: boolean) => void;
}

const RateSwitch = ({ rateSwitch, setRateSwitch }: Props) => {
  return (
    <div className="border border-gray-400 hover:border-gray-700 rounded-lg px-3 py-2">
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography variant="body1">HOB-Rate</Typography>
        <CustomSwitch
          onChange={() => handleSwitch(rateSwitch, setRateSwitch)}
        />
        <Typography>Anzahl HOBs</Typography>
      </Stack>
    </div>
  );
};

export default RateSwitch;
