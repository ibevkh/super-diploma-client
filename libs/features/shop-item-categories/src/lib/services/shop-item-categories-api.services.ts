import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginatedResponseDto } from '@ib/core/dto';
import { firstValueFrom } from 'rxjs';
import { ShopItemCategoryFormDto, ShopItemCategoryGridDto, ShopItemCategoryGridFilterDto } from '../dtos';

@Injectable ({ providedIn: 'root' })
export class ShopItemCategoriesApiService {
  readonly #http = inject(HttpClient);

  readonly #baseShopItemCategoryUrl = 'http://localhost:5001/api/shop-items-category';
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
