import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField, Typography } from '@mui/material';

interface Props {
  startMonth: string;
  endMonth: string;
  setStartMonth: (date: string) => void;
  setEndMonth: (date: string) => void;
}

function stringToDate(input: string): Date | null {
  if (!/^\d{6}$/.test(input)) return null;
  const month = parseInt(input.slice(0, 2), 10) - 1;
  const year = parseInt(input.slice(2), 10);
  return new Date(year, month);
}

function dateToString(input: Date): string {
  let newDate = '' + (input.getMonth() + 1) + input.getFullYear();
  if (newDate.length == 5) {
    newDate = '0' + newDate;
  }
  return newDate;
}

export default function MonthRangePicker({
  startMonth,
  endMonth,
  setStartMonth,
  setEndMonth,
}: Props) {
  let startYear = startMonth.slice(2);
  let endYear = endMonth.slice(2);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <DatePicker
          views={['year', 'month']}
          label="Von"
          value={stringToDate(startMonth)}
          onChange={(newValue) => {
            if (newValue) {
              let newDate = dateToString(newValue);
              setStartMonth(newDate);
            }
          }}
          minDate={new Date(2022, 9)}
          maxDate={new Date(2024, 11)}
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
            if (newValue) {
              let newDate = dateToString(newValue);
              setEndMonth(newDate);
            }
          }}
          minDate={new Date(2022, 9)}
          maxDate={new Date(2024, 11)}
          slotProps={{ textField: { size: 'small' } }}
        />
      </Box>
    </LocalizationProvider>
  );
}
