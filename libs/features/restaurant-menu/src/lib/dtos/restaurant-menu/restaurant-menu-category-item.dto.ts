import { RestaurantMenuItemDto } from './restaurant-menu-item.dto';

export type RestaurantMenuCategoryItemDto = {
  id: number;
  name: string;
  description: string;
  items: RestaurantMenuItemDto[];
}
