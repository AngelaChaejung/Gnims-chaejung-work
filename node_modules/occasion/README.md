# occasion

A date formatting library based on [moment.js](http://momentjs.com/docs/#/displaying/format/).  By only doing date formatting it is kept really small, and by not dealing with times, it avoids having to deal with time zones.  Pass in your date as a string in the form `YYYY-MM-DD` and get it in a nice format to display to your users.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/occasion/master.svg)](https://travis-ci.org/ForbesLindesay/occasion)
[![Dependency Status](https://img.shields.io/gemnasium/ForbesLindesay/occasion.svg)](https://gemnasium.com/ForbesLindesay/occasion)
[![NPM version](https://img.shields.io/npm/v/occasion.svg)](https://www.npmjs.org/package/occasion)

## Installation

    npm install occasion

##Usage

```js
var formatDate = require('occasion');

assert.deepEqual(formatDate('2014-06-01', 'Do MMM YYYY'), '1st Jun 2014');
assert.deepEqual(formatDate('2014-06-01', 'ddd D MMM'), 'Sun 1 Jun');
```

Tokens:

             | Token | Output
-------------|-------|---------------------------------------
Year         | YY    | 70 71 ... 29 30
             | YYYY  | 1970 1971 ... 2029 2030
Month        | M     | 1 2 ... 11 12
             | Mo    | 1st 2nd ... 11th 12th
             | MM    | 01 02 ... 11 12
             | MMM   | Jan Feb ... Nov Dec
             | MMMM  | January February ... November December
Day of Month | D     | 1 2 ... 30 31
             | Do    | 1st 2nd ... 30th 31st
             | DD    | 01 02 ... 30 31
Day of Week  | dd    | Su Mo ... Fr Sa
             | ddd   | Sun Mon ... Fri Sat
             | dddd  | Sunay Monday ... Friday Saturday

## License

  MIT
