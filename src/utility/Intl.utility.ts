import { createIntl, createIntlCache } from 'react-intl';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/fr';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/fr';

// import frLang from '@languages/fr.compile.json';
import enLang from '@languages/en.compile.json';

import * as CI from '@interfaces/Common.interface';
import * as GU from '@utility/General.utility';

// @ts-ignore
const locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
const languageWithoutRegionCode = locale.toLowerCase().split(/[_-]+/)[0];
const localizations: any = { en: enLang, /* fr: frLang */ };
const messages = localizations[languageWithoutRegionCode || locale];

// Formatjs / React-Intl: Imperative API for use in redux
const cache = createIntlCache();
const intl = createIntl({ locale, messages }, cache);

// https://momentjs.com/docs/#/customization/relative-time-threshold/
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR   = 60 * MINUTE;
const DAY    = 24 * HOUR;
const rtfUnitLimits: number[] = [
    1 * SECOND,
   60 * SECOND,
   60 * MINUTE,
   24 * HOUR,
    7 * DAY,
   30 * DAY,
  365 * DAY,
  Number.POSITIVE_INFINITY
];
const rtfUnitData: [ unitMs: number, unitLimitMs: number, unit: CI.RelativeTimeFormatUnitType ][] = [
  [ rtfUnitLimits[0], rtfUnitLimits[1], CI.RelativeTimeFormatUnit.SECOND ],
  [ rtfUnitLimits[1], rtfUnitLimits[2], CI.RelativeTimeFormatUnit.MINUTE ],
  [ rtfUnitLimits[2], rtfUnitLimits[3], CI.RelativeTimeFormatUnit.HOUR   ],
  [ rtfUnitLimits[3], rtfUnitLimits[4], CI.RelativeTimeFormatUnit.DAY    ],
  [ rtfUnitLimits[4], rtfUnitLimits[5], CI.RelativeTimeFormatUnit.WEEK   ],
  [ rtfUnitLimits[5], rtfUnitLimits[6], CI.RelativeTimeFormatUnit.MONTH  ],
  [ rtfUnitLimits[6], rtfUnitLimits[7], CI.RelativeTimeFormatUnit.YEAR   ],
];
const rtf = new Intl.RelativeTimeFormat(locale, { localeMatcher: 'best fit', numeric: 'always', style: 'long' });
function getRelativeTime(ts: number): string {
  const dt: number = Date.now() - ts;
  const [ unitMs,, unit ] = rtfUnitData[GU.getInsertPosition(rtfUnitData, dt, ([,a],b) => (a-1) - b)];
  return rtf.format(-Math.round(dt / unitMs), unit);
}

export { locale, messages, intl, getRelativeTime, SECOND, MINUTE, HOUR, DAY };


