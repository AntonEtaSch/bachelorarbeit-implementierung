export interface RawData {
  hobType: string;
  periodType: string;
  calendarDateStart: string;
  calendarDateEnd: string;
  wardGroupType: string;
  wardGroupValue: string;
  numberOfHOBs: string;
  numberOfBloodCultureSamples: string;
  numberOfPatientDays: string;
  bcRate: string;
  hobRate: string;
}

export interface MonthlyData {
  calendarDate: string;
  numberOfHOBs: number;
  numberOfBloodCultureSamples: number;
  numberOfPatientDays: number;
  bcRate: number;
  hobRate: number;
}