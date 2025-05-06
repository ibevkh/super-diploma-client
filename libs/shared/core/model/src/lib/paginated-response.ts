export type PaginatedResponse<T> = {
  totalQty: number;
  pageSize?: number;
  pageNumber?: number;
  data: T;
}
