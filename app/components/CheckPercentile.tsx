import React from 'react';
import { FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const CheckPercentile = () => {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
          // checked={checked}
          // onChange={handleChange}
          />
        }
        label="Ich stimme zu"
      />
      <FormControlLabel
        control={
          <Checkbox
          // checked={checked}
          // onChange={handleChange}
          />
        }
        label="Ich stimme zu"
      />
      <FormControlLabel
        control={
          <Checkbox
          // checked={checked}
          // onChange={handleChange}
          />
        }
        label="Ich stimme zu"
      />
    </FormGroup>
  );
};

export default CheckPercentile;
