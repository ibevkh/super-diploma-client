import { DeepPartial, DeepRequired } from 'ngx-vest-forms';
import { RestaurantMenuItem } from '../restaurant-menu/restaurant-menu-item';
import { OrderItemGrid } from './order-item-grid';

export type OrderRequest = DeepPartial<{
  id: number;
  customerName: string;
  customerPhoneNumber: string;
  deliveryAddress: string;
  deliveryTime: string;
  items: OrderItemGrid[];
}>;

export const OrderRequestFormShape: DeepRequired<OrderRequest> = {
  id: 0,
  customerName: '',
  customerPhoneNumber: '',
  deliveryAddress: '',
  deliveryTime: '',
  items: [],
};

export const initialOrderRequestForm: OrderRequest = {
  id: undefined,
  customerName: 'Новий клієнт',
  customerPhoneNumber: undefined,
  deliveryAddress: undefined,
  deliveryTime: undefined,
  items: [],
};
