import { DeepPartial, DeepRequired } from 'ngx-vest-forms';

// export type ShopItemCategoryForm = {
//   id: number;
//   name: string;
//   description: string;
// }

export type ShopItemCategoryForm = DeepPartial<{
  id: number;
  name: string;
  description: string;
}>;

export const shopItemCategoryFormShape: DeepRequired<ShopItemCategoryForm> = {
  id: 0,
  name: '',
  description: '',
};

export const initialShopItemCategoryForm: ShopItemCategoryForm = {
  id: undefined,
  name: 'Нова категорія',
  description: undefined,
};

