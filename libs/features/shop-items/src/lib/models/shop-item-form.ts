import { DeepPartial, DeepRequired } from 'ngx-vest-forms';

export type ShopItemForm = DeepPartial<{
  id: number;
  name: string;
  description: string;
  state: number;
  image: string;
  price: number;
  categoryId: number;
}>;

export const shopItemFormShape: DeepRequired<ShopItemForm> = {
  id: 0,
  categoryId: 1,
  name: '',
  state: 1,
  image: '',
  price: 0,
  description: '',
};

export const initialShopItemForm: ShopItemForm = {
  id: undefined,
  categoryId: undefined,
  name: 'Новий шоп айтем',
  state: 1,
  image: undefined,
  price: 0,
  description: undefined,
};


