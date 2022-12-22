import { describe, expect, test } from '@jest/globals';

import { convertMillisIntoMMSS, formatIntoReadableDate } from './time';

describe('utils :: time helpers', () => {
  test('should convert a valid millis quantity', () => {
    expect(convertMillisIntoMMSS(0)).toBe('00:00');
    expect(convertMillisIntoMMSS(60000)).toBe('01:00');
    expect(convertMillisIntoMMSS(1000000)).toBe('16:40');
    expect(convertMillisIntoMMSS(4568000)).toBe('76:08');
  });

  test('should convert as zero an invalid or negative quantity', () => {
    expect(convertMillisIntoMMSS()).toBe('00:00');
    expect(convertMillisIntoMMSS(null)).toBe('00:00');
    expect(convertMillisIntoMMSS(-60000)).toBe('01:00');
  });

  test('should convert a valid stringified date', () => {
    expect(formatIntoReadableDate()).toBe('-/-/-');
    expect(formatIntoReadableDate('')).toBe('-/-/-');
    expect(formatIntoReadableDate('2022-08-18T11:00:00Z')).toBe('18/08/2022');
  });
  test('should convert successfully an invalid string', () => {
    expect(formatIntoReadableDate(null)).toBe('-/-/-');
    expect(formatIntoReadableDate('invalid date')).toBe('-/-/-');
  });
});
