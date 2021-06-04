"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateMin = exports.validateMax = exports.nowFormatDate = exports.formatTime = exports.formatFullDate = exports.formatDate = exports.diffDays = exports.convertTo = void 0;

var _luxon = require("luxon");

Date.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];

const convertTo = ({
  date,
  type = 'ISO'
}) => {
  let rawDate = '';

  if (type === 'ISO') {
    rawDate = _luxon.DateTime.fromISO(date);
  } else if (type === 'SQL') {
    rawDate = _luxon.DateTime.fromSQL(date);
  } else if (type === 'JS') {
    rawDate = _luxon.DateTime.fromJSDate(date);
  }

  return rawDate;
};

exports.convertTo = convertTo;

const diffDays = ({
  dateOne,
  dateTwo,
  type = 'SQL'
}) => {
  const i1 = convertTo({
    date: dateOne,
    type
  });
  const i2 = convertTo({
    date: dateTwo,
    type
  });
  const calcDiff = i2.diff(i1, 'days').toObject();
  return Math.floor(Math.abs(calcDiff.days));
};

exports.diffDays = diffDays;

const diffNowYears = date => {
  const i1 = _luxon.DateTime.fromSQL(date);

  const calcDiff = i1.diffNow('years').toObject();
  return Math.abs(calcDiff.years);
};

const formatDate = ({
  date,
  type = 'SQL',
  withYear = false
}) => {
  const rawDate = convertTo({
    date,
    type
  });
  const month = rawDate.toLocaleString({
    month: 'numeric'
  });
  const day = rawDate.toLocaleString({
    day: '2-digit'
  });
  const year = rawDate.toFormat('y');
  if (withYear) return `${day} ${Date.shortMonths[month - 1]}, ${year}`;
  return `${day} ${Date.shortMonths[month - 1]}`;
};

exports.formatDate = formatDate;

const formatTime = ({
  date,
  type = 'SQL'
}) => {
  const rawDate = convertTo({
    date,
    type
  });
  const hours = rawDate.toFormat('hh');
  const minutes = rawDate.toFormat('mm');
  const meridiem = rawDate.toFormat('a');
  return `${hours}:${minutes} ${meridiem}`;
};

exports.formatTime = formatTime;

const formatFullDate = ({
  date,
  type = 'SQL',
  withYear = false
}) => `${formatDate({
  date,
  type,
  withYear
})} - ${formatTime({
  date,
  type
})}`;

exports.formatFullDate = formatFullDate;

const validateMax = (date, max) => {
  const years = diffNowYears(date);
  if (years > max) return false;
  return true;
};

exports.validateMax = validateMax;

const nowFormatDate = ({
  withYear = false
}) => {
  const now = _luxon.DateTime.now().toISO();

  return formatFullDate({
    date: now,
    type: 'ISO',
    withYear
  });
};

exports.nowFormatDate = nowFormatDate;

const validateMin = (date, min) => {
  const years = diffNowYears(date);
  if (years < min) return false;
  return true;
};

exports.validateMin = validateMin;