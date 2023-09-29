export interface IFilterResult {
  data: any;
  meta: {
    currentPage: number;
    nextPage: number;
    previousPage: number;
    itemsPerPage: number;
    totalPages: number;
    totalItems: number;
  };
}
