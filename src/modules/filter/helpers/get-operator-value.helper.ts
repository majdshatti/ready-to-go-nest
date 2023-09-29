import { FilterOperator } from '..';
import { arrayify, isObjKey } from 'src/utils';

/**
 * Gets ($gte, $lt, ...etc) operators and returns its values (=>, <, ...etc)
 *
 * @param operator string might hold the values $gte, $lte, ...etc
 * @returns string | boolean
 */
export const getOperatorValue = (
  operator: string,
  allowedOperators: string | string[],
): string | false => {
  allowedOperators = arrayify(allowedOperators);

  // operator passed by the url must starts with `$`
  if (operator[0] !== '$') return false;

  // reform $gte/$gt/$lt...etc to /GTE/GT/LT...etc
  operator = operator.replace('$', '').toUpperCase();

  if (!isObjKey(operator, FilterOperator)) {
    return false;
  }

  if (!allowedOperators.includes(FilterOperator[operator])) return false;

  return FilterOperator[operator];
};
