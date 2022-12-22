import { describe, test } from '@jest/globals';
// import { renderHook } from '@testing-library/react-hooks';

// import useStorageWithCache from './useStorageWithCache';

describe('useStorageWithCache hook', () => {
  test('should ...', async() => {
    /*
      Currently, it seems that there's a problem testing hooks with React v18, because the
      implementation uses older API (<v18), which implies an error during its execution.

      https://github.com/testing-library/react-hooks-testing-library/blob/3b719d1b637105eda7c7b481c9772cfbd1d52b2d/src/dom/pure.ts

      In the given source file (pure.ts), we can check that API used is ReactDOM.render, which is
      not allowed for v18, and considerates the tests as if they were v17.
       - v17 => ReactDOM.render(...)
       - v18 => ReactDOM.createRoot(...)

      Moreover, the own repo of testing-library has an opened PR about v18 update (at the moment of writing):
      https://github.com/testing-library/react-hooks-testing-library/pull/927
    */
    // renderHook(() => useStorageWithCache());
  });
});
