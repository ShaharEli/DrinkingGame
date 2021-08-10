import moment from 'moment';
export const DAY_IN_MS = 24 * 60 * 60 * 1000;
const DAY_IN_CHAT = 'D in MMMM YYYY';
const DAY_IN_CHATS = 'D.M.YYYY';
const LAST_CONNECTED_START = 'last seen ';

export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));
export const dateToFromNowDaily = (myDate: Date) =>
  moment(myDate).calendar(null, {
    lastDay: '[Yesterday] ',
    nextWeek: DAY_IN_CHATS,
    sameDay: 'HH:mm',
    nextDay: '[Tomorrow]',
    lastWeek: DAY_IN_CHATS,
    sameElse: DAY_IN_CHATS,
  });

export const dateToFromNowToChat = (myDate: Date): string =>
  moment(myDate).calendar(null, {
    lastDay: '[Yesterday] ',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: DAY_IN_CHAT,
    lastWeek: DAY_IN_CHAT,
    sameElse: DAY_IN_CHAT,
  });

export const isDifferentDay = (day1: Date, day2: Date): boolean =>
  !moment(day1).isSame(moment(day2), 'day');

export const calcLastConnected = (date: Date): string =>
  LAST_CONNECTED_START +
  moment(date).calendar(null, {
    lastDay: '[Yesterday at] HH:mm',
    sameDay: '[Today at] HH:mm',
    nextDay: '[Yesterday at] HH:mm',
    nextWeek: 'MM dd, YYYY',
    lastWeek: 'MM dd, YYYY',
    sameElse: 'MM dd, YYYY',
  });

export const greeting = () => {
  const hour = moment().hour();

  if (hour > 17) {
    return 'goodEvening';
  }
  if (hour > 12) {
    return 'goodAfternoon';
  }
  return 'goodMorning';
};
