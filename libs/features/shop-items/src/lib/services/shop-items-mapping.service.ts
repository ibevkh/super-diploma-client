import { Injectable } from '@angular/core';
import {
  PaginatedResponseDto,
  ShopItemFilterDatasourceDto, ShopItemFormDatasourceDto, ShopItemFormDto,
  ShopItemGridFilterDto,
  ShopItemListItemDto,
  ShopItemPreviewDto
} from '../dtos';
import {
  ShopItemFilterDatasource,
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

  mapShopItemFilterDatasourceFromDto(dto: ShopItemFilterDatasourceDto): ShopItemFilterDatasource{
    return dto as ShopItemFilterDatasource;
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

  mapShopItemFormDatasourceToDto(filter: ShopItemFormDatasource): ShopItemFormDatasourceDto {
    return filter as ShopItemFormDatasourceDto;
  }

}
