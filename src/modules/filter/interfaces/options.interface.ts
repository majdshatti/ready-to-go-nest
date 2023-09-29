import { FilterOperator } from '../';

interface IFilterableColumnsObject {
  [key: string]: FilterOperator | FilterOperator[];
}

interface IFilterableRelationColumnsObject {
  relationName: string;
  columns: {
    [key: string]: FilterOperator;
  };
}

interface IConditionObject {
  [key: string]: any;
}

interface IPaginate {
  skip?: number;
  limit: number;
}

export interface IFilterOptions {
  sortableColumns?: string[];
  searchableColumns?: string[];
  defaultSortBy?: [[string, 'DESC' | 'ASC']];
  filterableColumns?: IFilterableColumnsObject;
  filterableRelationColumns?: IFilterableRelationColumnsObject[];
  withRelations?: string[];
  selectFields?: string[];
  paginate?: IPaginate;
  conditions?: IConditionObject;
}
