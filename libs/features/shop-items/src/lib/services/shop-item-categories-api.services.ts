import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PaginatedResponseDto } from '../dtos';
import { ShopItemCategoryFormDto } from '../dtos/shop-item-categories/shop-item-category-form.dto';
import { ShopItemCategoryGridFilterDto } from '../dtos/shop-item-categories/shop-item-category-grid-filter.dto';
import { ShopItemCategoryGridDto } from '../dtos/shop-item-categories/shop-item-category-grid.dto';

@Injectable ({ providedIn: 'root' })
export class ShopItemCategoriesApiService {
  readonly #http = inject(HttpClient);

  readonly #baseShopItemCategoryUrl = 'https://localhost:7076/api/shop-items-category';
  readonly #gridShopItemCategoryUrl = `${this.#baseShopItemCategoryUrl}/list`;

  async getFilteredListCategory(
    filter: ShopItemCategoryGridFilterDto
  ): Promise<PaginatedResponseDto<ShopItemCategoryGridDto[]>> {
    return await firstValueFrom(
      this.#http.post<PaginatedResponseDto<ShopItemCategoryGridDto[]>>(
        this.#gridShopItemCategoryUrl,
        filter
      )
    );
  }

  async getCategoryById(id: number): Promise<ShopItemCategoryFormDto> {
    return await firstValueFrom(
      this.#http.get<ShopItemCategoryFormDto>(`${this.#baseShopItemCategoryUrl}/${id}`)
    );
  }

  async createOrUpdateCategory(item: ShopItemCategoryFormDto): Promise<ShopItemCategoryFormDto> {
    return await firstValueFrom(
      this.#http.post<ShopItemCategoryFormDto>(this.#baseShopItemCategoryUrl, item)
    );
  }

  async deleteCategory(id: number): Promise<ShopItemCategoryFormDto> {
    return await firstValueFrom(
      this.#http.delete<ShopItemCategoryFormDto>(`${this.#baseShopItemCategoryUrl}/${id}`)
    );
  }
}
