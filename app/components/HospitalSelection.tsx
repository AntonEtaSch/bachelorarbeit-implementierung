// Krankenhausauswahlkomponente bestehend aus einem Dropdownmenüs
// wird für primäres und vergleichskrankenhaus genutzt

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { hospitalSelectionProps } from '../types/SelectionProps';
import { krankenhaeuser } from '../api/hob-rates/data-all';

const HospitalSelection = ({
  first, // primäres oder vergleichskrankenhaus
  hospital, // aktueller wert des selector
  setHospital, // setzen der neuen werte
  setWardGroupType, // "
  setWardGroup, // "
}: hospitalSelectionProps) => {
  return (
    <FormControl sx={{ my: 1, mr: 1, minWidth: 180 }}>
      <InputLabel
        id={first ? 'krankenhaus-label' : 'krankenhaus-compare-label'}
      >
        Krankenhaus
      </InputLabel>
      <Select
        // in farbe des charts
        sx={
          first
            ? {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6A5ACD',
                },
              }
            : {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#A31545',
                },
              }
        }
        labelId={first ? 'krankenhaus-label' : 'krankenhaus-compare-label'}
        id={first ? 'krankenhaus' : 'krankenhaus-compare'}
        value={hospital}
        label="Krankenhaus"
        onChange={(event) => {
          // setzte hospital auf ausgewählten wert
          setHospital(event.target.value);
          // falls alle gewählt -> werte für stationen raus nehmen (für api logik)
          if (event.target.value == 'Alle') {
            setWardGroupType('');
            setWardGroup('');
            // sonst auf alle setzen
          } else {
            setWardGroupType('Alle');
            setWardGroup('Alle');
          }
        }}
      >
        <MenuItem value={'Alle'}>Alle</MenuItem>
        {krankenhaeuser.map((k) => (
          <MenuItem value={k}>Krankenhaus {k}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default HospitalSelection;
