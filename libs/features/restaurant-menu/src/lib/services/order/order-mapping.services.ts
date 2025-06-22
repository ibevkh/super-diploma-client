import { Injectable } from '@angular/core';
import { OrderRequestDto } from '../../dtos';
import { OrderRequest } from '../../models';

@Injectable({ providedIn: 'root' })
export class OrderMappingServices{
  mapOrderRequestToDto(item: OrderRequest): OrderRequestDto {
    const dto = item as OrderRequestDto;
    dto.totalAmount = dto.items.reduce((acc, i) => acc + i.price, 0);
    return dto;
  }
}
