const { DateTime } = require('luxon');

const getOperationDate = ({ date, days = 2, from = 'JS', to = 'SQL' }) => {
  let outDate = '';

  if (from === 'JS' && to === 'SQL') {
    outDate = DateTime.fromJSDate(date)
      .plus({ days })
      .toSQL({ includeOffset: false });
  }
  return outDate;
};

module.exports = { getOperationDate };
