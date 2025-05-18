import { RestaurantMenuItem } from './restaurant-menu/restaurant-menu-item';

export type BasketItem = {
  menuItem: RestaurantMenuItem,
  quantity: number;
  // totalAmount: number;
}
