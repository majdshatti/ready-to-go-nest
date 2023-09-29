/**
 * Get a sql operator and form where condition based on the passed operator
 *
 * @param operator string ("=", "<", "LIKE", ...etc)
 * @param col string table column
 *
 * @returns string
 */
export const getWhereStatement = (operator: string, col: string) => {
  let sqlStatment: string = '';

  if (operator === 'IN') {
    sqlStatment = `${col} ${operator} (:...${col})`;
  } else if (operator === 'LIKE') {
    sqlStatment = `${col} ${operator} '%' || :${col} || '%'`;
  } else {
    sqlStatment = `${col} ${operator} :${col}`;
  }

  return sqlStatment;
};
