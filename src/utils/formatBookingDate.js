Date.shortMonths = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

export default function formatBookingDate(bookingDate) {
  let input = bookingDate.toString().split(' ');

  if (input.length > 2) {
    // Si entra aqui...Significa que la fecha viene con el Time Zone
    const formatDate = new Date(bookingDate);

    const fomartBookingDate = `${formatDate.getFullYear()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getDate()} ${formatDate.getHours()}:${formatDate.getMinutes()}:${formatDate.getSeconds()}`;

    input = fomartBookingDate.toString().split(' ');
  }

  const dateInput = new Date(input[0]);
  const hourInput = input[1];

  const date = formatShortDate(dateInput);
  const hour = formatAMPM(hourInput);

  return `${date} - ${hour}`;
}

function formatShortDate(date) {
  const day = date.getDate();
  const shortMonth = Date.shortMonths[date.getMonth()];

  return `${day} ${shortMonth.replace(/[.]/, '')}`;
}

function formatAMPM(hour) {
  const arr = hour.split(':');
  const res = { hours: arr[0], minutes: arr[1], range: 'AM' };

  if (arr[0] >= '12') {
    res.hours = (arr[0] % 12).toString();
    if (res.hours.length === 1) {
      res.hours = `0${res.hours}`;
    }
    res.range = 'PM';
  }
  if (arr[0] === '12') {
    res.hours = '12';
  }
  if (arr[0] === '00') {
    res.hours = '12';
  }
  if (arr[1].length === 1) {
    res.minutes = `0${res.minutes}`;
  }
  return `${res.hours}:${res.minutes} ${res.range}`;
}
