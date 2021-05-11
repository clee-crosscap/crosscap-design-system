import * as GU from '@utility/General.utility';

export type GLColor = [ number, number, number, number ];

export const RS = {
  IDLE:      GU.getValue("idle"),
  PENDING:   GU.getValue("pending"),
  FULFILLED: GU.getValue("fulfilled"),
  REJECTED:  GU.getValue("rejected"),
};
export type RSType = (typeof RS)[keyof typeof RS];

export interface RSData {
  status: RSType,
  timestamp: number,
}
export const InitialRS = {
  status: RS.IDLE,
  timestamp: 0,
}
export function shouldFetch(rsData?: RSData, settings?: { errorTimeout?: number, refreshTimeout?: number }): boolean {
  const { status, timestamp } = rsData || InitialRS;
  const refreshNum: number = (typeof settings?.refreshTimeout === 'number' && settings.refreshTimeout > 0) ? settings.refreshTimeout : Number.POSITIVE_INFINITY;
  const retryNum:   number = (typeof settings?.errorTimeout === 'number'   && settings.errorTimeout   > 0) ? settings.errorTimeout   : Number.POSITIVE_INFINITY;
  switch(status) {
    case RS.IDLE:       return true;
    case RS.PENDING:    return false;
    case RS.FULFILLED:  return (Date.now() > (timestamp + refreshNum));
    case RS.REJECTED:   return (Date.now() > (timestamp + retryNum  ));
    default:                return false;
  }
}
export function isRequestStatusIdle(rs?: RSData): boolean {
  return !rs || rs.status === RS.IDLE;
}
export function isRequestStatusPending(rs?: RSData): boolean {
  return !!rs && (rs.status === RS.PENDING);
}
export function isRequestStatusFulfilled(rs?: RSData): boolean {
  return !!rs && (rs.status === RS.FULFILLED);
}
export function isRequestStatusRejected(rs?: RSData): boolean {
  return !!rs && (rs.status === RS.REJECTED);
}
export function isRequestStatusDone(rs?: RSData): boolean {
  return !!rs && (rs.status === RS.FULFILLED || rs.status === RS.REJECTED);
}

export function setStatus(status: RSType, netStatusData: RSData): void {
  netStatusData.status = status;

  switch(status) {
    case RS.FULFILLED:  netStatusData.timestamp = Date.now();  break;
    case RS.REJECTED:   netStatusData.timestamp = Date.now();  break;
  }
};

export const RelativeTimeFormatUnit = {
  SECOND:   GU.getValue("second"),
  MINUTE:   GU.getValue("minute"),
  HOUR:     GU.getValue("hour"),
  DAY:      GU.getValue("day"),
  WEEK:     GU.getValue("week"),
  MONTH:    GU.getValue("month"),
  QUARTER:  GU.getValue("quarter"),
  YEAR:     GU.getValue("year"),
};
export type RelativeTimeFormatUnitType = (typeof RelativeTimeFormatUnit)[keyof typeof RelativeTimeFormatUnit];

export const ModuleCodeName = {
  PLATFORM_ADMIN:    GU.getValue('platform-admin'),
  CALENDAR:          GU.getValue('calendar'),
  DISTRO:            GU.getValue('distro'),
  BUDGETING:         GU.getValue('budgeting'),
  PROOFING:          GU.getValue('proofing'),
};
export type ModuleCodeNameType = (typeof ModuleCodeName)[keyof typeof ModuleCodeName];
