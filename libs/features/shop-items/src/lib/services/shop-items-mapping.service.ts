import { Injectable } from '@angular/core';
import {
  PaginatedResponseDto,
  ShopItemGridDatasourceDto, ShopItemFormDatasourceDto, ShopItemFormDto,
  ShopItemGridFilterDto,
  ShopItemListItemDto,
  ShopItemPreviewDto
} from '../dtos';
import {
  ShopItemGridDatasource,
  ShopItemForm, ShopItemFormDatasource,
  ShopItemGridFilter,
  ShopItemListItem,
  ShopItemPreview
} from '../models';
import { PaginatedResponse } from '../models/paginated-response';

@Injectable({providedIn: 'root'})
export class ShopItemsMappingService {
  mapShopItemGridFilterToDto(filter: ShopItemGridFilter): ShopItemGridFilterDto {
    return filter as ShopItemGridFilterDto;
  }

  mapShopItemListItemFromDto(dto: ShopItemListItemDto): ShopItemListItem {
    return dto as ShopItemListItem;
  }

  mapPaginatedResponseFromDto(dto: PaginatedResponseDto<ShopItemListItemDto[]>) {
    return {
      pageNumber: dto.pageNumber,
      pageSize: dto.pageSize,
      totalQty: dto.totalQty,
      data: dto.data.map(item => this.mapShopItemListItemFromDto(item)),
    } as PaginatedResponse<ShopItemListItemDto[]>
  }

  mapShopItemGridDatasourceFromDto(dto: ShopItemGridDatasourceDto): ShopItemGridDatasource{
    return dto as ShopItemGridDatasource;
  };

  mapShopItemPreviewFromDto(dto: ShopItemPreviewDto ): ShopItemPreview {
    return dto as ShopItemPreview;
  }

  mapShopItemFormFromDto(dto: ShopItemFormDto): ShopItemForm {
    return dto as ShopItemForm;
  }

  mapShopItemFormToDto(filter: ShopItemForm) : ShopItemFormDto {
    return filter as ShopItemFormDto;
  }

  mapShopItemFormDatasourceFromDto(dto: ShopItemFormDatasourceDto): ShopItemFormDatasource {
    return dto as ShopItemFormDatasource;
  }
}
