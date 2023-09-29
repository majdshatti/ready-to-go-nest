export const checkTableAlias = (
  value: string,
  tableAlias: string,
  relations: string[],
): string => {
  if (!value.includes('.')) return tableAlias;

  // Check wether the table alias is a relation instead
  if (relations.includes(value.split('.')[0])) {
    return '';
  }

  return tableAlias;
};
