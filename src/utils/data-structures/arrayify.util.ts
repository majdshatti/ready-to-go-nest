/**
 * Convert an element to array
 *
 * @param value
 * @returns Array
 */
export const arrayify = (value: any): [] => {
  if (!Array.isArray(value)) {
    value = new Array(value);
  }

  return value;
};
