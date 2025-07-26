// Komponente für das Steuern der Anzeige der Perzentile
// Wird nur bei HOB-Rate und ohne Vergleich angezeigt

import React from 'react';
import { FormControlLabel, Checkbox, Stack } from '@mui/material';

interface Props {
  percentileSelect: boolean[];
  setPercentileSelect: (b: boolean[]) => void;
}

const CheckPercentile = ({ percentileSelect, setPercentileSelect }: Props) => {
  return (
    <div>
      <Stack direction="row" spacing={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={percentileSelect[0]}
              onChange={() =>
                setPercentileSelect([
                  !percentileSelect[0],
                  percentileSelect[1],
                  percentileSelect[2],
                ])
              }
              sx={{
                '&.Mui-checked': {
                  color: '#FF5733D9', // selbe farbe wie im chart
                },
              }}
            />
          }
          label="75. Perzentil"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={percentileSelect[1]}
              onChange={() =>
                setPercentileSelect([
                  percentileSelect[0],
                  !percentileSelect[1],
                  percentileSelect[2],
                ])
              }
              sx={{
                '&.Mui-checked': {
                  color: '#C70039D9', // selbe farbe wie im chart
                },
              }}
            />
          }
          label="85. Perzentil"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={percentileSelect[2]}
              onChange={() =>
                setPercentileSelect([
                  percentileSelect[0],
                  percentileSelect[1],
                  !percentileSelect[2],
                ])
              }
              sx={{
                '&.Mui-checked': {
                  color: '#800020D9', // selbe farbe wie im chart
                },
              }}
            />
          }
          label="95. Perzentil"
        />
      </Stack>
      <div className="min-w-20"></div>
    </div>
  );
};

export default CheckPercentile;
