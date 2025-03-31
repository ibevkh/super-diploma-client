export type ShopItemGridFilterDto = {

  /**
   * Page number
   * Page numbers start from 0 index
   * Example: 0
   */
  pageNumber?: number;

  /**
   * Quantity of items on page
   * Example: 10
   */
  pageSize?: number;

  /**
   * Identifier of category
   * Example: 1
   */
  categoryId?: number;

  /**
   * Shop item state
   * Example: 1
   */
  state?: number;
}
