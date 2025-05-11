import { RestaurantMenuItem } from './restaurant-menu-item';

export type RestaurantMenuCategoryItem = {
  id: number;
  name: string;
  description: string;
  items: RestaurantMenuItem[];
}
