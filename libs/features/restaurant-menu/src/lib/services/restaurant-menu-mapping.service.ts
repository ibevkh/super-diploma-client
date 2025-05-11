import { Injectable } from '@angular/core';
import { RestaurantMenuCategoryItemDto } from '../dtos';
import { RestaurantMenuCategoryItem } from '../models';

@Injectable({ providedIn: 'root' })
export class RestaurantMenuMappingService {
  mapRestaurantMenuDtoToModel(
    dtos: RestaurantMenuCategoryItemDto[]
  ): RestaurantMenuCategoryItem[] {
    return dtos.map((dto) => ({
      id: dto.id,
      name: dto.name,
      description: dto.description,
      items: dto.items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        categoryId: item.categoryId,
        price: item.price,
        image: item.image,
      })),
    }));
  }

  // mapRestaurantMenuModelToDto(
  //   models: RestaurantMenuCategoryItem[]
  // ): RestaurantMenuCategoryItemDto[] {
  //   return models.map((model) => ({
  //     id: model.id,
  //     name: model.name,
  //     description: model.description,
  //     items: model.items.map((item) => ({
  //       id: item.id,
  //       name: item.name,
  //       description: item.description,
  //       categoryId: item.categoryId,
  //       price: item.price,
  //       image: item.image,
  //     })),
  //   }));
  // }
}
