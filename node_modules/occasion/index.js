'use strict';

var assert = require('assert');

exports = (module.exports = format);
exports.MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
exports.MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
exports.DAYS_EXTRA_SHORT = [
  'Su',
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa'
];
exports.DAYS_SHORT = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];
exports.DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

function format(date, format) {
  assert(typeof date === 'string' && /^\d\d\d\d\-\d\d\-\d\d$/.test(date), 'Date must start as a string in the format YYYY-MM-DD');
  assert(typeof format === 'string');
  var split = date.split('-');
  var year = +split[0];
  var month = +split[1];
  var day = +split[2];

  return format.replace(/(\[[^\[]*\])|(YY(YY)?|Mo|M{1,4}|Do|DD?|ddd?d?)/g, function (part) {
    return exports.formatFunctions[part] ? exports.formatFunctions[part](year, month, day) : part.replace(/[\[\]]/g, '');
  });
}

exports.formatFunctions = {
  YY   : function (year, month, day) {
    return pad(year % 100, 2);
  },
  YYYY : function (year, month, day) {
    return pad(year, 4);
  },
  M: function (year, month, day) {
    return month + '';
  },
  Mo: function (year, month, day) {
    return ordinal(month);
  },
  MM: function (year, month, day) {
    return pad(month, 2);
  },
  MMM: function (year, month, day) {
    return exports.MONTHS_SHORT[month - 1];
  },
  MMMM: function (year, month, day) {
    return exports.MONTHS[month - 1];
  },
  D: function (year, month, day) {
    return day + '';
  },
  Do: function (year, month, day) {
    return ordinal(day);
  },
  DD: function (year, month, day) {
    return pad(day, 2);
  },
  dd: function (year, month, day) {
    return exports.DAYS_EXTRA_SHORT[dayOfWeek(year, month, day)];
  },
  ddd: function (year, month, day) {
    return exports.DAYS_SHORT[dayOfWeek(year, month, day)];
  },
  dddd: function (year, month, day) {
    return exports.DAYS[dayOfWeek(year, month, day)];
  }
};

function dayOfWeek(year, month, day) {
  return (new Date(year, month - 1, day)).getDay();
}

function ordinal(number) {
  switch (number) {
    case 1:
    case 21:
    case 31:
      return number + 'st';
    case 2:
    case 22:
    case 32:
      return number + 'nd';
    case 3:
    case 23:
    case 33:
      return number + 'rd';
    default:
      return number + 'th';
  }
}
function pad(number, digits) {
  number = number + '';
  while (number.length < digits) {
    number = '0' + number;
  }
  return number;
}
