import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Props {
  hospital: string;
  wardGroupType: string;
  wardGroup: string;
  setHospital: (s: string) => void;
  setWardGroupType: (s: string) => void;
  setWardGroup: (s: string) => void;
}

const Einrichtung = ({
  hospital,
  wardGroupType,
  wardGroup,
  setHospital,
  setWardGroupType,
  setWardGroup,
}: Props) => {
  const wards1 = [
    'qxCPh4XDfkx8RkP',
    'r8yDoYVk8xm9wYq',
    'NmXqiiS94w69ZOU',
    'LJQyxZG08LK8xow',
    'QF0etR5CU3FSgt4',
    'LmqHopUFL6i2Hmw',
    '3kHdcwhT00iLNoZ',
    'P4jCDiDZHOkfpPS',
    'bsmdd99cko5UUWF',
    'btNwpXi7pEBpopW',
    'aDUporvjcboxtSt',
    'SVwwQWcfwDI697a',
    'YELj7BkdKHfkRVN',
    '77chppSVFpaBz7G',
    'cYfj4IFTW7Adp8x',
    'uEPROfQWrJ9D9JS',
    'eOkbVuzAsBQIeNj',
    'SM1ksZBA0BvqQ5B',
    'OWzmdFPrSRsLW9J',
    'BV3Plb3NagG7paE',
    '0ueUzQ2oJO7vtwl',
    'OiS8zPlTK3EokXw',
    'Kw6MKJDQsou4ztD',
    '3M58Fxc9unD5iVz',
    'wskZfC14tauE4ch',
    'oibS3mgRsx2oJJ0',
    '3fF6snl0P99nEJK',
    'AjAwRxGfqGciAnu',
    'NyK3e670H07IORQ',
    'ZX12F3c8edssiP8',
    'jjpMqUSd296qQwn',
    'vgYBt6FsYgDLpDB',
    'AyNJwiD0Ao0Qh1O',
    'HAI0qiEfoMp0XW3',
    'dtyo43hw5WiN1aG',
    'zcNDehjunRNy8R0',
    'xmW3XGxuYLA0DCx',
    '0k00ZXjNku5vJpH',
    'NxlGtYe4RcRGdov',
    'ITv7y6s7Gvv85U0',
    '9B4GLahpvnKPMpw',
    'sk4XtUKQZeAH2mF',
    'lkg6eMK8sfkADaX',
    '0cDZKm1atGbYaDa',
    'f6i4gLPYVPP0DUn',
    '4BHW2zLdLVyJWEG',
    'hcjUMm9BdHE7Sg0',
    '5ysx9LN7X4yajVf',
    'pT6fsPYZQ9XuGtR',
    'QMuvCD7Jm65xIuK',
    'vXNMB2HsKEki1rE',
    'egwEkTxIdBxSnDt',
    'n3cLzkIX74HkE57',
    'Qf1t9SYpS5grHGX',
    'RxPKCk9PyD7fRe3',
    'U3x4P9mC4UXLUkf',
  ];
  const ecdcWards1 = [
    'GO',
    'PED',
    'MIX',
    'ICU',
    'MED',
    'NEO',
    'GER',
    'SUR',
    'PSY',
    'RHB',
    'OTH',
  ];
  const localWards1 = ['LocalGroup2', 'LocalGroup1'];

  return (
    <div>
      <p>Einrichtung Auswählen</p>

      <FormControl sx={{ my: 1, mr: 1, minWidth: 180 }}>
        <InputLabel id="krankenhaus-select-label">Krankenhaus</InputLabel>
        <Select
          labelId="krankenhaus-select-label"
          id="krankenhaus-select"
          value={hospital}
          label="Krankenhaus"
          onChange={(event) => {
            setHospital(event.target.value);
          }}
        >
          <MenuItem value={'Alle'}>Alle</MenuItem>
          <MenuItem value={'Krankenhaus #1'}>Krankenhaus #1</MenuItem>
          <MenuItem value={'Krankenhaus #2'}>Krankenhaus #2</MenuItem>
          <MenuItem value={'Krankenhaus #3'}>Krankenhaus #3</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="wardGroupType-select-label">Ward Group Type</InputLabel>
        <Select
          labelId="wardGroupType-select-label"
          id="wardGroupType-select"
          value={wardGroupType}
          label="Ward Group Type"
          onChange={(event) => {
            setWardGroupType(event.target.value);
          }}
        >
          <MenuItem value={'Alle'}>Alle</MenuItem>
          <MenuItem value={'WARD'}>Wards</MenuItem>
          <MenuItem value={'ECDCWARD'}>ECDC Wards</MenuItem>
          <MenuItem value={'LOCALWARD'}>Local Wards</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="wardGroup-select-label">Ward Group</InputLabel>
        <Select
          labelId="wardGroup-select-label"
          id="wardGroup-select"
          value={wardGroup}
          label="Ward Group"
          onChange={(event) => {
            setWardGroup(event.target.value);
          }}
        >
          <MenuItem value={''}>Alle</MenuItem>
          {(wardGroupType == 'Alle' || wardGroupType == 'WARD') &&
            wards1.map((w) => <MenuItem value={w}>{w}</MenuItem>)}
          {(wardGroupType == 'Alle' || wardGroupType == 'ECDCWARD') &&
            ecdcWards1.map((w) => <MenuItem value={w}>{w}</MenuItem>)}
          {(wardGroupType == 'Alle' || wardGroupType == 'LOCALWARD') &&
            localWards1.map((w) => <MenuItem value={w}>{w}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
};

export default Einrichtung;
