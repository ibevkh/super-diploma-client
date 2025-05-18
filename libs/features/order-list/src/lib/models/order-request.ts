import { DeepPartial, DeepRequired } from 'ngx-vest-forms';
import { OrderItemGrid } from './order-item-grid';

export type OrderRequest = DeepPartial<{
  id: number;
  customerName: string;
  customerPhoneNumber: string;
  deliveryAddress: string;
  deliveryTime: string;
  totalAmount: number;
  items: OrderItemGrid[];
}>;

export const OrderRequestFormShape: DeepRequired<OrderRequest> = {
  id: 0,
  customerName: '',
  customerPhoneNumber: '',
  deliveryAddress: '',
  deliveryTime: '',
  totalAmount: 0,
  items: [],
};

export const initialOrderRequestForm: OrderRequest = {
  id: undefined,
  customerName: 'Новий клієнт',
  customerPhoneNumber: undefined,
  deliveryAddress: undefined,
  deliveryTime: undefined,
  totalAmount: 0,
  items: [],
};
