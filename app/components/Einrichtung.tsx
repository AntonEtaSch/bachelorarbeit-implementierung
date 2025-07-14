import React from 'react';
import { Button } from '@mui/material';
import KrankenhausSelect from './KrankenhausSelect';
import WardSelect from './WardSelect';

interface Props {
  hospital: string;
  wardGroupType: string;
  wardGroup: string;
  setHospital: (s: string) => void;
  setWardGroupType: (s: string) => void;
  setWardGroup: (s: string) => void;
  compare: boolean;
  setCompare: (b: boolean) => void;
  hospitalCompare: string;
  setHospitalCompare: (s: string) => void;
  wardGroupTypeCompare: string;
  setWardGroupTypeCompare: (s: string) => void;
  wardGroupCompare: string;
  setWardGroupCompare: (s: string) => void;
}

const Einrichtung = ({
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
}: Props) => {
  const compareButton = (
    <Button sx={{ m: 1, minWidth: 180 }} onClick={() => setCompare(true)}>
      Vergleich Hinzufügen
    </Button>
  );
  const removeCompareButton = (
    <Button sx={{ m: 1, minWidth: 180 }} onClick={() => setCompare(false)}>
      Vergleich Entfernen
    </Button>
  );

  return (
    <div>
      <p>Einrichtung Auswählen</p>
      <div>
        <>
          <KrankenhausSelect
            first={true}
            hospital={hospital}
            setHospital={setHospital}
            setWardGroupType={setWardGroupType}
            setWardGroup={setWardGroup}
          ></KrankenhausSelect>
          {hospital != 'Alle' && (
            <WardSelect
              first={true}
              hospital={hospital}
              wardGroupType={wardGroupType}
              setWardGroupType={setWardGroupType}
              wardGroup={wardGroup}
              setWardGroup={setWardGroup}
            ></WardSelect>
          )}
          {compare ? removeCompareButton : compareButton}
        </>
      </div>
      <div>
        {compare && (
          <KrankenhausSelect
            first={false}
            hospital={hospitalCompare}
            setHospital={setHospitalCompare}
            setWardGroupType={setWardGroupTypeCompare}
            setWardGroup={setWardGroupCompare}
          ></KrankenhausSelect>
        )}
        {compare && hospitalCompare != 'Alle' && (
          <WardSelect
            first={false}
            hospital={hospitalCompare}
            wardGroupType={wardGroupTypeCompare}
            setWardGroupType={setWardGroupTypeCompare}
            wardGroup={wardGroupCompare}
            setWardGroup={setWardGroupCompare}
          ></WardSelect>
        )}
      </div>
    </div>
  );
};

export default Einrichtung;
