/**
 * Method that converts a time duration in seconds into minutes and seconds, in the mm:ss format
 * @param {number} millis the quantity of milliseconds to convert
 * @returns a string following the format mm:ss
 */
export const convertMillisIntoMMSS = (millis = 0) => {
  const denominator = 1000 * 60;
  const minutes = Math.abs(Math.floor(millis / denominator));
  const seconds = Math.abs(((millis % denominator) / 1000).toFixed(0));
  return `${_formatTimeDigit(minutes)}:${_formatTimeDigit(seconds)}`;
};

/**
 * Method that formats a date (string) into a dd/mm/yyyy format
 * @param {string} stringifiedDate date to be formatted
 * @returns formatted date following the format dd/mm/yyyy
 */
export const formatIntoReadableDate = (stringifiedDate = '') => {
  if (!stringifiedDate || stringifiedDate.indexOf('T') < 0) {
    return '-/-/-';
  } else {
    const [date] = stringifiedDate.split('T');
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
};

/**
 * "Private" helper to build a two-digit hours or minutes quantity
 * @param {*} timeDigit number to format in two-digit
 * @returns a string that follow a two-digit pattern (00, 01, 02... 09, 10, 11...)
 */
const _formatTimeDigit = (timeDigit) => timeDigit.toString().padStart(2, '0');
