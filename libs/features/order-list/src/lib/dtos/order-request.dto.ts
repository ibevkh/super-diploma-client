import { OrderItemGridDto } from './order-item-grid.dto';

export type OrderRequestDto = {
  id: number | null;
  customerName: string;
  customerPhoneNumber: string;
  deliveryAddress: string;
  deliveryTime: string;
  totalAmount: number;
  items: OrderItemGridDto[];
}
