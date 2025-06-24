'use client';

import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField, Typography } from '@mui/material';

interface Props {
  startMonth: String;
  endMonth: String;
  setStartMonth: (date: String) => void;
  setEndMonth: (date: String) => void;
}

export default function MonthRangePicker({
  startMonth,
  endMonth,
  setStartMonth,
  setEndMonth,
}: Props) {
  // const [startMonth, setStartMonth] = useState<Date | null>(null);
  // const [endMonth, setEndMonth] = useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <DatePicker
          views={['year', 'month']}
          label="Von"
          value={
            new Date(
              parseInt(startMonth.slice(2)),
              parseInt(startMonth.slice(0, 2)) - 1
            )
          }
          onChange={(newValue) => {
            setStartMonth('01012000');
            console.log(newValue);
          }}
          maxDate={
            new Date(
              parseInt(endMonth.slice(2)),
              parseInt(endMonth.slice(0, 2)) - 1
            ) ?? undefined
          }
          slotProps={{ textField: { size: 'small' } }}
        />

        <DatePicker
          views={['year', 'month']}
          label="Bis"
          value={
            new Date(
              parseInt(endMonth.slice(2)),
              parseInt(endMonth.slice(0, 2)) - 1
            )
          }
          onChange={(newValue) => {
            setEndMonth('' + newValue?.getMonth() + newValue?.getFullYear());
            console.log(endMonth);
          }}
          minDate={
            new Date(
              parseInt(startMonth.slice(2)),
              parseInt(startMonth.slice(0, 2)) - 1
            ) ?? undefined
          }
          slotProps={{ textField: { size: 'small' } }}
        />
      </Box>
    </LocalizationProvider>
  );
}
