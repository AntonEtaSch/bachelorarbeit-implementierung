import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DropdownSubheader from './DropdownSubheader';
import {
  hospitalWards1,
  ecdcWards1,
  localWards1,
} from '@/app/api/hob-rates/data-1';
import {
  hospitalWards2,
  ecdcWards2,
  localWards2,
} from '@/app/api/hob-rates/data-2';
import {
  hospitalWards3,
  ecdcWards3,
  localWards3,
} from '@/app/api/hob-rates/data-3';

interface Props {
  first: boolean;
  hospital: string;
  wardGroupType: string;
  setWardGroupType: (s: string) => void;
  wardGroup: string;
  setWardGroup: (s: string) => void;
}

const WardSelect = ({
  first,
  hospital,
  wardGroupType,
  setWardGroupType,
  wardGroup,
  setWardGroup,
}: Props) => {
  let wards: string[] = [];
  let ecdc: string[] = [];
  let local: string[] = [];
  switch (hospital) {
    case '2':
      wards = hospitalWards2;
      ecdc = ecdcWards2;
      local = localWards2;
      break;
    case '3':
      wards = hospitalWards3;
      ecdc = ecdcWards3;
      local = localWards3;
      break;
    default:
      wards = hospitalWards1;
      ecdc = ecdcWards1;
      local = localWards1;
  }

  const selector = (
    <>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id={first ? 'wgt-select-label' : 'wgt-compare-label'}>
          Ward Group Type
        </InputLabel>
        <Select
          labelId={first ? 'wgt-select-label' : 'wgt-compare-label'}
          id={first ? 'wgt-select' : 'wgt-compare'}
          value={wardGroupType}
          label="Ward Group Type"
          onChange={(event) => {
            setWardGroupType(event.target.value);
            setWardGroup('Alle');
          }}
        >
          <MenuItem value={'Alle'}>Alle</MenuItem>
          <MenuItem value={'WARD'}>Wards</MenuItem>
          <MenuItem value={'ECDCWARD'}>ECDC Wards</MenuItem>
          <MenuItem value={'LOCALWARD'}>Local Wards</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id={first ? 'wg-select-label' : 'wg-compare-label'}>
          Ward Group
        </InputLabel>
        <Select
          labelId={first ? 'wg-select-label' : 'wg-compare-label'}
          id={first ? 'wg-select' : 'wg-compare'}
          value={wardGroup}
          label="Ward Group"
          onChange={(event) => {
            setWardGroup(event.target.value);
            if (wards.includes(event.target.value)) setWardGroupType('WARD');
            else if (ecdc.includes(event.target.value))
              setWardGroupType('ECDCWARD');
            else if (local.includes(event.target.value))
              setWardGroupType('LOCALWARD');
          }}
        >
          <MenuItem value={'Alle'}>Alle</MenuItem>
          {wardGroupType == 'Alle' && (
            <DropdownSubheader>Wards</DropdownSubheader>
          )}
          {(wardGroupType == 'Alle' || wardGroupType == 'WARD') &&
            wards.map((w) => <MenuItem value={w}>{w}</MenuItem>)}

          {wardGroupType == 'Alle' && (
            <DropdownSubheader>ECDC Wards</DropdownSubheader>
          )}
          {(wardGroupType == 'Alle' || wardGroupType == 'ECDCWARD') &&
            ecdc.map((w) => <MenuItem value={w}>{w}</MenuItem>)}

          {wardGroupType == 'Alle' && (
            <DropdownSubheader>Local Wards</DropdownSubheader>
          )}
          {(wardGroupType == 'Alle' || wardGroupType == 'LOCALWARD') &&
            local.map((w) => <MenuItem value={w}>{w}</MenuItem>)}
        </Select>
      </FormControl>
    </>
  );

  return selector;
};

export default WardSelect;
