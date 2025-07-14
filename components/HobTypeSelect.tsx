import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Props {
  hobType: string;
  setHobType: (s: string) => void;
}

const HobTypeSelect = ({ hobType, setHobType }: Props) => {
  return (
    <FormControl sx={{ my: 1, mr: 1, minWidth: 180 }}>
      <InputLabel id="hobType-select-label">Hob Type</InputLabel>
      <Select
        labelId="hobType-select-label"
        id="hobType-select"
        value={hobType}
        label="Hob Type"
        onChange={(event) => {
          setHobType(event.target.value);
        }}
      >
        <MenuItem value={'ALL'}>Alle</MenuItem>
        <MenuItem value={'WITH_PATHOGEN'}>Pathogene</MenuItem>
        <MenuItem value={'WITH_COMMENSAL'}>Kommensale</MenuItem>
      </Select>
    </FormControl>
  );
};

export default HobTypeSelect;
