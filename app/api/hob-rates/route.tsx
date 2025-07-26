import { NextRequest, NextResponse } from 'next/server';
import { hospitaldata1, percentile1 } from './data-1';
import { hospitaldata2, percentile2 } from './data-2';
import { hospitaldata3, percentile3 } from './data-3';
import { hospitaldata4, percentile4 } from './data-4';
import { hospitaldata5, percentile5 } from './data-5';
import { hospitaldata6, percentile6 } from './data-6';
import { hospitalAll } from './data-all';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { error } from 'console';

export function GET(request: NextRequest) {
  const percentile = request.nextUrl.searchParams.get('percentile');
  const hospital = request.nextUrl.searchParams.get('hospital');
  let data: {
    hobType: string;
    calendarDateStart: string;
    calendarDateEnd: string;
    hobRate: string;
    wardGroupType?: string;
    wardGroupValue?: string;
    numberOfHOBs?: string;
    numberOfBloodCultureSamples?: string;
    numberOfPatientDays?: string;
    bcRate?: string;
    percentile?: string;
  }[] = [];
  if (!percentile) {
    // nicht perzentildatenabfrage
    switch (hospital) {
      case '1':
        data = hospitaldata1;
        break;
      case '2':
        data = hospitaldata2;
        break;
      case '3':
        data = hospitaldata3;
        break;
      case '4':
        data = hospitaldata4;
        break;
      case '5':
        data = hospitaldata5;
        break;
      case '6':
        data = hospitaldata6;
        break;
      default:
        data = hospitalAll;
        break;
    }
  } else {
    // perzentilabfrage
    switch (hospital) {
      case '1':
        data = percentile1;
        break;
      case '2':
        data = percentile2;
        break;
      case '3':
        data = percentile3;
        break;
      case '4':
        data = percentile4;
        break;
      case '5':
        data = percentile5;
        break;
      case '6':
        data = percentile6;
        break;
      default:
        console.error(
          `Perzentile von Krankenhaus "${hospital}" nicht gefunden`
        );
    }
  }
  const hobType = request.nextUrl.searchParams.get('hobType');
  const calendarDateStart =
    request.nextUrl.searchParams.get('calendarDateStart');
  const calendarDateEnd = request.nextUrl.searchParams.get('calendarDateEnd');
  const wardGroupType = request.nextUrl.searchParams.get('wardGroupType');
  const wardGroupValue = request.nextUrl.searchParams.get('wardGroupValue');

  if (hobType) {
    data = data.filter((hob) => hob.hobType === hobType);
  }

  if (calendarDateStart) {
    const dateStart = new Date(
      parseInt(calendarDateStart.slice(2)),
      parseInt(calendarDateStart.slice(0, 2)) - 1
    );

    data = data.filter((hob) => {
      const hobDateStart = new Date(
        parseInt(hob.calendarDateStart.slice(6)),
        parseInt(hob.calendarDateStart.slice(3, 5)) - 1
      );
      if (dateStart <= hobDateStart) return true;
    });
  }

  if (calendarDateEnd) {
    const dateEnd = new Date(
      parseInt(calendarDateEnd.slice(2)),
      parseInt(calendarDateEnd.slice(0, 2)),
      0
    );

    data = data.filter((hob) => {
      const hobDateEnd = new Date(
        parseInt(hob.calendarDateEnd.slice(6)),
        parseInt(hob.calendarDateEnd.slice(3, 5)) - 1,
        parseInt(hob.calendarDateEnd.slice(0, 2))
      );
      if (dateEnd >= hobDateEnd) return true;
    });
  }

  if (wardGroupType) {
    data = data.filter((hob) => hob.wardGroupType === wardGroupType);
  }

  if (wardGroupValue) {
    data = data.filter((hob) => hob.wardGroupValue === wardGroupValue);
  }

  if (percentile) {
    data = data.filter((obj) => obj.percentile === percentile);
  }

  return NextResponse.json(data);
}
