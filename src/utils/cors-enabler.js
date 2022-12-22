import API_ENDPOINTS from 'models/api-endpoints';

/**
 * Build the URL ready for consuming CORS-ed endpoints
 * @param {*} url endpoint's URL
 * @returns an string that uses "https://cors-anywhere.herokuapp.com/" service for enable CORS consumption
 */
export const buildUrlForCORS = (url = '') => API_ENDPOINTS.CORS_URL + url;
