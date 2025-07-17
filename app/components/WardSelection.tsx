// Stationsauswahlkomponente bestehend aus zwei Dropdownmenüs
// wird für primäres und vergleichskrankenhaus genutzt
// wardgrouptype bestimmt sozusagen die vordefinierten gruppen an wards (oder einzelne)

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DropdownSubheader from './DropdownSubheader';
// importiere alle namen der wards
import {
  hospitalWards1,
  ecdcWards1,
  localWards1,
} from '../api/hob-rates/data-1';
import {
  hospitalWards2,
  ecdcWards2,
  localWards2,
} from '../api/hob-rates/data-2';
import {
  hospitalWards3,
  ecdcWards3,
  localWards3,
} from '../api/hob-rates/data-3';
import {
  hospitalWards4,
  ecdcWards4,
  localWards4,
} from '../api/hob-rates/data-4';
import {
  hospitalWards5,
  ecdcWards5,
  localWards5,
} from '../api/hob-rates/data-5';
import {
  hospitalWards6,
  ecdcWards6,
  localWards6,
} from '../api/hob-rates/data-6';
import { wardSelectionProps } from '../types/SelectionProps';

const WardSelect = ({
  first, // primäres oder vergleichskrankenhaus
  hospital, // gibt stationen vor
  wardGroupType, // "
  wardGroup, // aktueller stationswert
  setWardGroupType, // setzt anzeige von wardgruppen
  setWardGroup, // setzt neue wardgruppe (oder ward)
}: wardSelectionProps) => {
  let wards: string[] = [];
  let ecdc: string[] = [];
  let local: string[] = [];
  // je nach krankenhaus wardnamen übernehmen
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
    case '4':
      wards = hospitalWards4;
      ecdc = ecdcWards4;
      local = localWards4;
      break;
    case '5':
      wards = hospitalWards5;
      ecdc = ecdcWards5;
      local = localWards5;
      break;
    case '6':
      wards = hospitalWards6;
      ecdc = ecdcWards6;
      local = localWards6;
      break;
    default:
      wards = hospitalWards1;
      ecdc = ecdcWards1;
      local = localWards1;
  }

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id={first ? 'wgt-select-label' : 'wgt-compare-label'}>
          Ward Gruppen Typ
        </InputLabel>
        <Select
          labelId={first ? 'wgt-select-label' : 'wgt-compare-label'}
          id={first ? 'wgt-select' : 'wgt-compare'}
          value={wardGroupType}
          label="Ward Gruppen Typ"
          onChange={(event) => {
            // Bei änderung des Types immer Gruppen/Wardauswahl auf alle
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
          {wardGroupType == 'WARD' ? <>Ward</> : <>Ward Gruppe</>}
        </InputLabel>
        <Select
          labelId={first ? 'wg-select-label' : 'wg-compare-label'}
          id={first ? 'wg-select' : 'wg-compare'}
          value={wardGroup}
          label={wardGroupType == 'WARD' ? 'Ward' : 'Ward Gruppe'}
          onChange={(event) => {
            // setzte passenden wardgruppentyp
            setWardGroup(event.target.value);
            if (wards.includes(event.target.value)) setWardGroupType('WARD');
            else if (ecdc.includes(event.target.value))
              setWardGroupType('ECDCWARD');
            else if (local.includes(event.target.value))
              setWardGroupType('LOCALWARD');
          }}
        >
          {/* falls wardgrouptype nicht gesetzt -> zeigt alle ward groups + header*/}
          <MenuItem value={'Alle'}>Alle</MenuItem>

          {wardGroupType == 'Alle' && (
            <DropdownSubheader>Local Wards</DropdownSubheader>
          )}
          {(wardGroupType == 'Alle' || wardGroupType == 'LOCALWARD') &&
            local.map((w) => <MenuItem value={w}>{w}</MenuItem>)}

          {wardGroupType == 'Alle' && (
            <DropdownSubheader>ECDC Wards</DropdownSubheader>
          )}
          {(wardGroupType == 'Alle' || wardGroupType == 'ECDCWARD') &&
            ecdc.map((w) => <MenuItem value={w}>{w}</MenuItem>)}

          {wardGroupType == 'Alle' && (
            <DropdownSubheader>Wards</DropdownSubheader>
          )}
          {(wardGroupType == 'Alle' || wardGroupType == 'WARD') &&
            wards.map((w) => <MenuItem value={w}>{w}</MenuItem>)}
        </Select>
      </FormControl>
    </>
  );
};

export default WardSelect;
