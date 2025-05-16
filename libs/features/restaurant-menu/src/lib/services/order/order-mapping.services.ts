import { Injectable } from '@angular/core';
import { OrderGridDto, OrderGridFilterDto, OrderRequestDto } from '../../dtos';
import { OrderGrid, OrderRequest } from '../../models';
import { OrderGridFilter } from '../../models/order/order-grid-filter';


@Injectable({ providedIn: 'root' })
export class OrderMappingServices{
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
      items: dto.items.map( item => ({
        shopItemId: item.shopItemId,
        shopItemName: item.shopItemName,
        quantity: item.quantity,
        price: item.price,
      }))
    }));
  }

  mapOrderRequestToDto(item: OrderRequest): OrderRequestDto {
    return item as OrderRequestDto;
  }
}
