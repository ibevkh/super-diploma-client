import { OrderItemGrid } from './order-item-grid';

export type OrderGrid = {
  id: number;
  customerName: string;
  customerPhoneNumber: string;
  customerAddress: string;
  createdAt: string;
  deliveryTime: string;
  itemNames: string;
  quantity: number;
  totalAmount: number;
  items: OrderItemGrid[];
}
