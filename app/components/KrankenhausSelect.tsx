import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Props {
  first: boolean;
  hospital: string;
  setHospital: (s: string) => void;
  setWardGroupType: (s: string) => void;
  setWardGroup: (s: string) => void;
}

const KrankenhausSelect = ({
  first,
  hospital,
  setHospital,
  setWardGroupType,
  setWardGroup,
}: Props) => {
  const selector = (
    <FormControl sx={{ my: 1, mr: 1, minWidth: 180 }}>
      <InputLabel
        id={first ? 'krankenhaus-label' : 'krankenhaus-compare-label'}
      >
        Krankenhaus
      </InputLabel>
      <Select
        labelId={first ? 'krankenhaus-label' : 'krankenhaus-compare-label'}
        id={first ? 'krankenhaus' : 'krankenhaus-compare'}
        value={hospital}
        label="Krankenhaus"
        onChange={(event) => {
          setHospital(event.target.value);
          if (event.target.value == 'Alle') {
            setWardGroupType('');
            setWardGroup('');
          } else {
            setWardGroupType('Alle');
            setWardGroup('Alle');
          }
        }}
      >
        <MenuItem value={'Alle'}>Alle</MenuItem>
        <MenuItem value={'1'}>Krankenhaus #1</MenuItem>
        <MenuItem value={'2'}>Krankenhaus #2</MenuItem>
        <MenuItem value={'3'}>Krankenhaus #3</MenuItem>
        <MenuItem value={'4'}>Krankenhaus #4</MenuItem>
        <MenuItem value={'5'}>Krankenhaus #5</MenuItem>
        <MenuItem value={'6'}>Krankenhaus #6</MenuItem>
      </Select>
    </FormControl>
  );
  return selector;
};

export default KrankenhausSelect;
