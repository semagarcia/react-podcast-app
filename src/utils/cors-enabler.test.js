import { describe, expect, test } from '@jest/globals';

import API_ENDPOINTS from 'models/api-endpoints';
import { buildUrlForCORS } from './cors-enabler';

describe('utils :: cors helpers', () => {
  test('should build a valid URL for consuming CORS service', () => {
    expect(buildUrlForCORS()).toBe(API_ENDPOINTS.CORS_URL);
    expect(buildUrlForCORS('')).toBe(API_ENDPOINTS.CORS_URL);
    expect(buildUrlForCORS('https://itunes.apple.com/lookup?id=1460157002')).toBe(
      `${API_ENDPOINTS.CORS_URL}https://itunes.apple.com/lookup?id=1460157002`
    );
  });
});
