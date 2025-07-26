export interface hospitalSelectionProps {
  first: boolean;
  hospital: string;
  setHospital: (s: string) => void;
  setWardGroupType: (s: string) => void;
  setWardGroup: (s: string) => void;
}

export interface wardSelectionProps {
  first: boolean;
  hospital: string;
  wardGroupType: string;
  setWardGroupType: (s: string) => void;
  wardGroup: string;
  setWardGroup: (s: string) => void;
}

export interface environmentSelectionProps {
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

export interface completeSelectionProps {
  startMonth: string;
  endMonth: string;
  setStartMonth: (date: string) => void;
  setEndMonth: (date: string) => void;
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
  hobType: string;
  setHobType: (s: string) => void;
  rateSwitch: boolean;
  setRateSwitch: (b: boolean) => void;
  percentileSelect: boolean[];
  setPercentileSelect: (b: boolean[]) => void;
}


export interface TimerangeProps {
  startMonth: string;
  endMonth: string;
  setStartMonth: (date: string) => void;
  setEndMonth: (date: string) => void;
}