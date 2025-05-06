import { Injectable } from '@angular/core';
import { ShopItemCategoryFormDto } from '../dtos/shop-item-categories/shop-item-category-form.dto';
import { ShopItemCategoryGridFilterDto } from '../dtos/shop-item-categories/shop-item-category-grid-filter.dto';
import { ShopItemCategoryGridDto } from '../dtos/shop-item-categories/shop-item-category-grid.dto';
import { ShopItemCategoryForm } from '../models/shop-item-categories/shop-item-category-form';
import { ShopItemCategoryGrid } from '../models/shop-item-categories/shop-item-category-grid';
import { ShopItemCategoryGridFilter } from '../models/shop-item-categories/shop-item-category-grid-filter';

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
