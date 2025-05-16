import { Injectable } from '@angular/core';
import { OrderRequestDto } from '../../dtos';
import { OrderRequest } from '../../models';

@Injectable({ providedIn: 'root' })
export class OrderMappingServices{
  mapOrderRequestToDto(item: OrderRequest): OrderRequestDto {
    return item as OrderRequestDto;
  }
}
