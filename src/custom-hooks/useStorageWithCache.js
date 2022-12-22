import { useEffect, useState } from 'react';

const TIME_EXPIRATION_IN_MILLIS = 24 * 60 * 60 * 1000;
// const TIME_EXPIRATION_IN_MILLIS = 15 * 1000;  // 15 segs for debugging purposes

/**
 * Hook for fetching data from external service (endpoint). When the data is retrieved, the hook checks,
 * according to a key, if the last request was made beyond of a expiration window; in case of old-data,
 * the hook stores the data for avoiding new requests, otherwise, the data will be saved locally in the
 * machine (not synced with other user-sessions or something similar)
 * @param {string} url endpoint URL
 * @param {string} key identifier used to store the response (data)
 * @param {Function} mapper optional function in order to made response's transformation before the info
 * will be saved
 * @returns An object with three properties: the data gathered, the flag for loading state and an error message
 */
const useStorageWithCache = (url = '', key = '', mapper) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem(key);
    try {
      return JSON.parse(savedData) || [];
    } catch {
      return [];
    }
  });
  const [lastSaveTimestamp, setLastSave] = useState(() => {
    const savedDataTimestamp = localStorage.getItem(key + '-ts');
    try {
      return JSON.parse(savedDataTimestamp) || 0;
    } catch {
      return 0;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: '' });

  useEffect(() => {
    if (Date.now() - lastSaveTimestamp > TIME_EXPIRATION_IN_MILLIS) {
      fetch(url)
        .then((response) => response.json())
        .then((resp) => {
          const dataToBeCached =
            mapper && typeof mapper === 'function' ? mapper(resp) : resp;
          try {
            const now = Date.now();
            localStorage.setItem(key + '-ts', JSON.stringify(now));
            setLastSave(now);
            localStorage.setItem(key, JSON.stringify(dataToBeCached));
            setData(dataToBeCached);
          } catch (error) {
            console.log('Error', error);
            setData([]);
            setError({ error: true, message: 'Error parsing' });
          }
        })
        .catch((error) => {
          console.log('ERROR! ', error);
          setData([]);
          setError({ error: true, message: 'Error fetching' });
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      setError({ error: false });
    }
  }, [url]);

  // If the destructuring is used as array, we can use specific name in each view;
  // otherwise, we lose semantic meaning due to the mandatory use of "data" (object key name)
  // return [data, isLoading, error];
  return { data, isLoading, error };
};

export default useStorageWithCache;
