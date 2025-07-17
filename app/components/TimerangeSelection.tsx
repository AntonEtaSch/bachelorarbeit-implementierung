// Komponente für die Auswahl des Zeitraumes bestehend aus MUI date pickern
// Interagiert mit dem TimerangeSlider unterhalb des Charts

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import { TimerangeProps } from '../types/SelectionProps';

// hilfsfunktion um string in datum zu konvertieren
function stringToDate(input: string): Date | null {
  if (!/^\d{6}$/.test(input)) return null;
  const month = parseInt(input.slice(0, 2), 10) - 1;
  const year = parseInt(input.slice(2), 10);
  return new Date(year, month);
}

// hilfsfunktion um datum in string zu konvertieren
function dateToString(input: Date): string {
  let newDate = '' + (input.getMonth() + 1) + input.getFullYear();
  if (newDate.length == 5) {
    newDate = '0' + newDate;
  }
  return newDate;
}

const TimerangeSelection = ({
  startMonth, // wert des startdatums (als string)
  endMonth, // wert des enddatums (als string)
  setStartMonth, // setzt startdatum
  setEndMonth, // setzt enddatum
}: TimerangeProps) => {
  return (
    <>
      <div className="my-2">Zeitraum Auswählen</div>
      <div className="mb-3">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
            <DatePicker
              views={['year', 'month']}
              label="Von"
              value={stringToDate(startMonth)}
              onChange={(newValue) => {
                if (newValue) {
                  setStartMonth(dateToString(newValue));
                }
              }}
              // eingeschränkt auf prototypischen zeitraum
              minDate={new Date(2022, 9)}
              maxDate={new Date(2024, 11)}
              slotProps={{ textField: { size: 'small' } }}
            />

            <DatePicker
              views={['year', 'month']}
              label="Bis"
              value={stringToDate(endMonth)}
              onChange={(newValue) => {
                if (newValue) {
                  setEndMonth(dateToString(newValue));
                }
              }}
              // eingeschränkt auf prototypischen zeitraum
              minDate={new Date(2022, 9)}
              maxDate={new Date(2024, 11)}
              slotProps={{ textField: { size: 'small' } }}
            />
          </Box>
        </LocalizationProvider>
      </div>
    </>
  );
};

export default TimerangeSelection;
