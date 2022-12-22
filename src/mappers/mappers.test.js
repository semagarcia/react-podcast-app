import { describe, expect, test } from '@jest/globals';

import { podcastDetailMapper, podcastListMapper } from './mappers';

describe('mappers', () => {
  test('should podcastListMapper transform a valid response', () => {
    expect(podcastListMapper({ feed: { entry: [{ a: 1 }, { b: 2 }] } }))
      .toEqual(expect.arrayContaining([{ a: 1 }, { b: 2 }]));
  });

  test('should podcastListMapper transform an empty response', () => {
    expect(podcastListMapper()).toEqual([]);
    expect(podcastListMapper({})).toEqual([]);
    expect(podcastListMapper({ feed: null })).toEqual([]);
    expect(podcastListMapper({ feed: { entry: [] } })).toEqual([]);
  });

  test('should podcastDetailMapper transform a valid response', () => {
    expect(podcastDetailMapper({ results: [] })).toEqual([]);
    expect(podcastDetailMapper({ results: [{ a: 0 }] })).toEqual(expect.arrayContaining([]));
    expect(podcastDetailMapper({ results: [{ a: 0 }, { b: 1 }] })).toEqual(expect.arrayContaining([{ b: 1 }]));
  });

  test('should podcastDetailMapper transform an empty response', () => {
    expect(podcastDetailMapper()).toEqual([]);
    expect(podcastDetailMapper({})).toEqual([]);
    expect(podcastDetailMapper({ results: null, otherKey: [{ a: 1 }] })).toEqual(expect.arrayContaining([]));
  });
});
