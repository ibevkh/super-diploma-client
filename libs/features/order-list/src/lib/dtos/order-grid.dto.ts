import { OrderItemGridDto } from './order-item-grid.dto';

export type OrderGridDto = {
  id: number;
  customerName: string;
  customerPhoneNumber: string;
  customerAddress: string;
  createdAt: string;
  deliveryTime: string;
  items: OrderItemGridDto[];
}
