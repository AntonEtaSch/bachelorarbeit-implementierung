// Einrichtungsauswahlkomponente inklusive primärer Einrichtung und optionaler
// Vergleichseinrichtung jeweils bestehend aus Krankenhaus und Stationsauswahl

import React from 'react';
import { Button } from '@mui/material';
import HospitalSelection from './HospitalSelection';
import WardSelection from './WardSelection';
import { environmentSelectionProps } from '../types/SelectionProps';

const EnvironmentSelection = ({
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
}: environmentSelectionProps) => {
  // Vergleichsbutton
  const compareButton = (
    <Button sx={{ m: 1, minWidth: 180 }} onClick={() => setCompare(!compare)}>
      {compare ? <>Vergleich Entfernen</> : <>Vergleich Hinzufügen</>}
    </Button>
  );

  return (
    <div>
      <p>Einrichtung Auswählen</p>
      <div>
        <>
          <HospitalSelection
            first={true}
            hospital={hospital}
            setHospital={setHospital}
            setWardGroupType={setWardGroupType}
            setWardGroup={setWardGroup}
          ></HospitalSelection>
          {hospital != 'Alle' && (
            <WardSelection
              first={true}
              hospital={hospital}
              wardGroupType={wardGroupType}
              setWardGroupType={setWardGroupType}
              wardGroup={wardGroup}
              setWardGroup={setWardGroup}
            ></WardSelection>
          )}
          {compareButton}
        </>
      </div>
      <div>
        {compare && (
          <HospitalSelection
            first={false}
            hospital={hospitalCompare}
            setHospital={setHospitalCompare}
            setWardGroupType={setWardGroupTypeCompare}
            setWardGroup={setWardGroupCompare}
          ></HospitalSelection>
        )}
        {compare && hospitalCompare != 'Alle' && (
          <WardSelection
            first={false}
            hospital={hospitalCompare}
            wardGroupType={wardGroupTypeCompare}
            setWardGroupType={setWardGroupTypeCompare}
            wardGroup={wardGroupCompare}
            setWardGroup={setWardGroupCompare}
          ></WardSelection>
        )}
      </div>
    </div>
  );
};

export default EnvironmentSelection;
