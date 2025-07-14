import { NextRequest, NextResponse } from 'next/server';
import { hospitaldata1 } from './data-1';
import { hospitaldata2 } from './data-2';
import { hospitaldata3 } from './data-3';
import { hospitaldata4 } from './data-4';
import { hospitaldata5 } from './data-5';
import { hospitaldata6 } from './data-6';
import { hospitalAll } from './data-all';

export function GET(request: NextRequest) {
  const hospital = request.nextUrl.searchParams.get('hospital');
  let hobs = hospitaldata1;
  switch (hospital) {
    case '1':
      hobs = hospitaldata1;
      break;
    case '2':
      hobs = hospitaldata2;
      break;
    case '3':
      hobs = hospitaldata3;
      break;
    case '4':
      hobs = hospitaldata4;
      break;
    case '5':
      hobs = hospitaldata5;
      break;
    case '6':
      hobs = hospitaldata6;
      break;
    default:
      hobs = hospitalAll;
      break;
  }
  const hobType = request.nextUrl.searchParams.get('hobType');
  const calendarDateStart =
    request.nextUrl.searchParams.get('calendarDateStart');
  const calendarDateEnd = request.nextUrl.searchParams.get('calendarDateEnd');
  const wardGroupType = request.nextUrl.searchParams.get('wardGroupType');
  const wardGroupValue = request.nextUrl.searchParams.get('wardGroupValue');

  if (hobType) {
    hobs = hobs.filter((hob) => hob.hobType === hobType);
  }

  if (calendarDateStart) {
    const dateStart = new Date(
      parseInt(calendarDateStart.slice(2)),
      parseInt(calendarDateStart.slice(0, 2)) - 1
    );

    hobs = hobs.filter((hob) => {
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

    hobs = hobs.filter((hob) => {
      const hobDateEnd = new Date(
        parseInt(hob.calendarDateEnd.slice(6)),
        parseInt(hob.calendarDateEnd.slice(3, 5)) - 1,
        parseInt(hob.calendarDateEnd.slice(0, 2))
      );
      if (dateEnd >= hobDateEnd) return true;
    });
  }

  if (wardGroupType) {
    hobs = hobs.filter((hob) => hob.wardGroupType === wardGroupType);
  }

  if (wardGroupValue) {
    hobs = hobs.filter((hob) => hob.wardGroupValue === wardGroupValue);
  }

  return NextResponse.json(hobs);
}
