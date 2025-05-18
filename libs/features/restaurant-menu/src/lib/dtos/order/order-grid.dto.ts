import { OrderItemGridDto } from './order-item-grid.dto';

export type OrderGridDto = {
  id: number;
  customerName: string;
  customerPhoneNumber: string;
  deliveryAddress: string;
  createdAt: string;
  totalAmount: number;
  items: OrderItemGridDto[];
}
