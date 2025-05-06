export type PaginatedResponseDto<T> = {
  totalQty: number;
  pageSize?: number;
  pageNumber?: number;
  data: T;
}
