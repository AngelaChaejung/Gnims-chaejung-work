'use strict';

var assert = require('assert');
var test = require('testit');
var format = require('../');

test('format.M', function () {
  assert.strictEqual(format.formatFunctions['M'](1000, 1, 1), '1');
  assert.strictEqual(format.formatFunctions['M'](1000, 2, 1), '2');
  assert.strictEqual(format.formatFunctions['M'](1000, 3, 1), '3');
  assert.strictEqual(format.formatFunctions['M'](1000, 4, 1), '4');
  assert.strictEqual(format.formatFunctions['M'](1000, 5, 1), '5');
  assert.strictEqual(format.formatFunctions['M'](1000, 6, 1), '6');
  assert.strictEqual(format.formatFunctions['M'](1000, 7, 1), '7');
  assert.strictEqual(format.formatFunctions['M'](1000, 8, 1), '8');
  assert.strictEqual(format.formatFunctions['M'](1000, 9, 1), '9');
  assert.strictEqual(format.formatFunctions['M'](1000, 10, 1), '10');
  assert.strictEqual(format.formatFunctions['M'](1000, 11, 1), '11');
  assert.strictEqual(format.formatFunctions['M'](1000, 12, 1), '12');
});
test('format.Mo', function () {
  assert.strictEqual(format.formatFunctions['Mo'](1000, 1, 1), '1st');
  assert.strictEqual(format.formatFunctions['Mo'](1000, 2, 1), '2nd');
  assert.strictEqual(format.formatFunctions['Mo'](1000, 3, 1), '3rd');
  assert.strictEqual(format.formatFunctions['Mo'](1000, 4, 1), '4th');
  assert.strictEqual(format.formatFunctions['Mo'](1000, 5, 1), '5th');
  assert.strictEqual(format.formatFunctions['Mo'](1000, 6, 1), '6th');
  assert.strictEqual(format.formatFunctions['Mo'](1000, 7, 1), '7th');
  assert.strictEqual(format.formatFunctions['Mo'](1000, 8, 1), '8th');
  assert.strictEqual(format.formatFunctions['Mo'](1000, 9, 1), '9th');
  assert.strictEqual(format.formatFunctions['Mo'](1000, 10, 1), '10th');
  assert.strictEqual(format.formatFunctions['Mo'](1000, 11, 1), '11th');
  assert.strictEqual(format.formatFunctions['Mo'](1000, 12, 1), '12th');
});
test('format.MM', function () {
  assert.strictEqual(format.formatFunctions['MM'](1000, 1, 1), '01');
  assert.strictEqual(format.formatFunctions['MM'](1000, 2, 1), '02');
  assert.strictEqual(format.formatFunctions['MM'](1000, 3, 1), '03');
  assert.strictEqual(format.formatFunctions['MM'](1000, 4, 1), '04');
  assert.strictEqual(format.formatFunctions['MM'](1000, 5, 1), '05');
  assert.strictEqual(format.formatFunctions['MM'](1000, 6, 1), '06');
  assert.strictEqual(format.formatFunctions['MM'](1000, 7, 1), '07');
  assert.strictEqual(format.formatFunctions['MM'](1000, 8, 1), '08');
  assert.strictEqual(format.formatFunctions['MM'](1000, 9, 1), '09');
  assert.strictEqual(format.formatFunctions['MM'](1000, 10, 1), '10');
  assert.strictEqual(format.formatFunctions['MM'](1000, 11, 1), '11');
  assert.strictEqual(format.formatFunctions['MM'](1000, 12, 1), '12');
});
test('format.MMM', function () {
  assert.strictEqual(format.formatFunctions['MMM'](1000, 1, 1), 'Jan');
  assert.strictEqual(format.formatFunctions['MMM'](1000, 2, 1), 'Feb');
  assert.strictEqual(format.formatFunctions['MMM'](1000, 3, 1), 'Mar');
  assert.strictEqual(format.formatFunctions['MMM'](1000, 4, 1), 'Apr');
  assert.strictEqual(format.formatFunctions['MMM'](1000, 5, 1), 'May');
  assert.strictEqual(format.formatFunctions['MMM'](1000, 6, 1), 'Jun');
  assert.strictEqual(format.formatFunctions['MMM'](1000, 7, 1), 'Jul');
  assert.strictEqual(format.formatFunctions['MMM'](1000, 8, 1), 'Aug');
  assert.strictEqual(format.formatFunctions['MMM'](1000, 9, 1), 'Sep');
  assert.strictEqual(format.formatFunctions['MMM'](1000, 10, 1), 'Oct');
  assert.strictEqual(format.formatFunctions['MMM'](1000, 11, 1), 'Nov');
  assert.strictEqual(format.formatFunctions['MMM'](1000, 12, 1), 'Dec');
});

test('format', function () {
  assert.strictEqual(format('2013-03-04', 'MMMM'), 'March');
assert.deepEqual(format('2014-06-01', 'Do MMM YYYY'), '1st Jun 2014');
assert.deepEqual(format('2014-06-01', 'ddd D MMM'), 'Sun 1 Jun');
});
