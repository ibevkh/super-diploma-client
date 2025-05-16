import { Injectable } from '@angular/core';
import { OrderGridFilterDto } from '../dtos/order-grid-filter.dto';
import { OrderGridDto } from '../dtos/order-grid.dto';
import { OrderItemGridDto } from '../dtos/order-item-grid.dto';
import { OrderRequestDto } from '../dtos/order-request.dto';
import { OrderGrid } from '../models/order-grid';
import { OrderGridFilter } from '../models/order-grid-filter';
import { OrderRequest } from '../models/order-request';

@Injectable({ providedIn: 'root' })
export class OrderListMappingServices{
  mapOrderGridFilterToDto (filter: OrderGridFilter) : OrderGridFilterDto {
    return filter as OrderGridFilterDto;
  }

  mapOrderGridDtoToModel(dtos: OrderGridDto[]) : OrderGrid[]{
    return dtos.map(dto => ({
      id: dto.id,
      customerName: dto.customerName,
      customerPhoneNumber: dto.customerPhoneNumber,
      customerAddress: dto.customerAddress,
      createdAt: dto.createdAt,
      deliveryTime: dto.deliveryTime,
      items: dto.items.map( item => ({
        shopItemId: item.shopItemId,
        shopItemName: item.shopItemName,
        quantity: item.quantity,
        price: item.price,
      })),
      quantity: dto.items.length,
      totalAmount: dto.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      itemNames: dto.items.reduce((s, item, i) =>
        s + item.shopItemName + (i < dto.items.length - 1 ? ', ' : ''), ''),
      // itemNames: this.combineItemNames(dto.items),
    }));
  }

  combineItemNames(items: OrderItemGridDto[]) {
    const itemsCount = items.length;
    let result = '';
    for (let i = 0; i < itemsCount; i++) {
      result += items[i].shopItemName + (i < itemsCount - 1 ? ', ' : '');
    }

    return result;
  }
}
