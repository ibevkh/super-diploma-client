import { Injectable } from '@angular/core';
import { ShopItemCategoryFormDto, ShopItemCategoryGridDto, ShopItemCategoryGridFilterDto } from '../dtos';
import { ShopItemCategoryForm, ShopItemCategoryGrid, ShopItemCategoryGridFilter } from '../models';

@Injectable({providedIn: 'root'})
export class ShopItemCategoryMappingService {

  mapShopItemCategoryGridFilterToDto(filter: ShopItemCategoryGridFilter)
    : ShopItemCategoryGridFilterDto {
    return filter as ShopItemCategoryGridFilterDto;
  }

  mapShopItemCategoryFormToDto(item: ShopItemCategoryForm)
    : ShopItemCategoryFormDto {
    return item as ShopItemCategoryFormDto;
  }

  mapShopItemCategoryFormFromDto(dto: ShopItemCategoryFormDto)
    : ShopItemCategoryForm {
    return dto as ShopItemCategoryForm;
  }

  mapShopItemCategoryGridListFromDto(dto: ShopItemCategoryGridDto[]): ShopItemCategoryGrid[] {
    return dto.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description
    }));
  }


}
