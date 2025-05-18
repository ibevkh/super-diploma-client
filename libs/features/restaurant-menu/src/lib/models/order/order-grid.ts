import { OrderItemGrid } from './order-item-grid';

export type OrderGrid = {
  id: number;
  customerName: string;
  customerPhoneNumber: string;
  deliveryAddress: string;
  createdAt: string;
  totalAmount: number;
  items: OrderItemGrid[];
}
