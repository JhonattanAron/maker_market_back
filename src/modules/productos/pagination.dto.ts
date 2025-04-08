export class PaginatedResult<T> {
  total: number;
  page: number;
  pageSize: number;
  products: T[];
}
