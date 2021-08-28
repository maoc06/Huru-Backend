import { DateTime } from 'luxon';

Date.shortMonths = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

const convertTo = ({ date, type = 'ISO' }) => {
  let rawDate = '';

  if (type === 'ISO') {
    rawDate = DateTime.fromISO(date);
  } else if (type === 'SQL') {
    rawDate = DateTime.fromSQL(date);
  } else if (type === 'JS') {
    rawDate = DateTime.fromJSDate(date);
  }

  return rawDate;
};

const diffDays = ({ dateOne, dateTwo, type = 'SQL' }) => {
  const i1 = convertTo({ date: dateOne, type });
  const i2 = convertTo({ date: dateTwo, type });

  const calcDiff = i2.diff(i1, 'days').toObject();

  return Math.floor(Math.abs(calcDiff.days));
};

const diffNowYears = (date) => {
  const i1 = DateTime.fromSQL(date);

  const calcDiff = i1.diffNow('years').toObject();

  return Math.abs(calcDiff.years);
};

const diffNowDefault = (date) => {
  const i1 = DateTime.fromSQL(date);
  return i1.diffNow().toObject().milliseconds;
};

const isLowDate = (dateIn, dateOut) => {
  const i1 = DateTime.fromSQL(dateIn);
  const i2 = DateTime.fromSQL(dateOut);

  return i2 < i1;
};

const formatDate = ({ date, type = 'SQL', withYear = false }) => {
  const rawDate = convertTo({ date, type });

  const month = rawDate.toLocaleString({ month: 'numeric' });
  const day = rawDate.toLocaleString({ day: '2-digit' });
  const year = rawDate.toFormat('y');

  if (withYear) return `${day} ${Date.shortMonths[month - 1]}, ${year}`;
  return `${day} ${Date.shortMonths[month - 1]}`;
};

const formatTime = ({ date, type = 'SQL' }) => {
  const rawDate = convertTo({ date, type });

  const hours = rawDate.toFormat('hh');
  const minutes = rawDate.toFormat('mm');
  const meridiem = rawDate.toFormat('a');

  return `${hours}:${minutes} ${meridiem}`;
};

const formatFullDate = ({ date, type = 'SQL', withYear = false }) =>
  `${formatDate({ date, type, withYear })} - ${formatTime({ date, type })}`;

const validateMax = (date, max) => {
  const years = parseInt(new Date().getFullYear(), 10) - parseInt(date, 10);
  if (years > max) return false;
  return true;
};

const nowFormatDate = ({ withYear = false }) => {
  const now = DateTime.now().toISO();
  return formatFullDate({ date: now, type: 'ISO', withYear });
};

const validateMin = (date, min) => {
  const years = diffNowYears(date);

  if (years < min) return false;
  return true;
};

const cancelationDate = ({ date, days = 1, type = 'JS' }) => {
  const time = formatTime({ date, type });
  const rawDate = convertTo({ date, type });

  const dayDate = rawDate.toFormat('d');
  const day = dayDate - days;

  const month = rawDate.toLocaleString({ month: 'numeric' });

  return `${time} del ${day} de ${Date.shortMonths[month - 1]}`;
};

export {
  convertTo,
  cancelationDate,
  diffDays,
  formatDate,
  formatFullDate,
  isLowDate,
  formatTime,
  nowFormatDate,
  diffNowDefault,
  validateMax,
  validateMin,
};
