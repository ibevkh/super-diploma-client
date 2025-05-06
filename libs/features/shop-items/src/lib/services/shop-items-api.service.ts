import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginatedResponseDto } from '@ib/core/dto';
import { firstValueFrom } from 'rxjs';
import {
  ShopItemGridDatasourceDto,
  ShopItemFormDatasourceDto,
  ShopItemFormDto,
  ShopItemListItemDto,
  ShopItemPreviewDto, ShopItemGridFilterDto
} from '../dtos';

@Injectable({ providedIn: 'root' })
export class ShopItemApiService {
  readonly #http = inject(HttpClient);

  readonly #baseShopItemUrl = 'https://localhost:7076/api/shop-items';
  readonly #filteredGridUrl = `${this.#baseShopItemUrl}/filtered-grid`;
  readonly #gridDataSource = `${this.#baseShopItemUrl}/grid-datasources`;
  readonly #preview = `${this.#baseShopItemUrl}/preview`;
  readonly #formDatasource = `${this.#baseShopItemUrl}/form-datasources`;

  async getFilteredList(
    filter: ShopItemGridFilterDto
  ): Promise<PaginatedResponseDto<ShopItemListItemDto[]>> {
    return await firstValueFrom(
      this.#http.post<PaginatedResponseDto<ShopItemListItemDto[]>>(
        this.#filteredGridUrl,
        filter
      )
    );
  }

  async getGridDatasources(): Promise<ShopItemGridDatasourceDto> {
    return await firstValueFrom(
      this.#http.get<ShopItemGridDatasourceDto>(this.#gridDataSource)
    );
  }

  async getPreviewById(id: number): Promise<ShopItemPreviewDto> {
    return await firstValueFrom(
      this.#http.get<ShopItemPreviewDto>(`${this.#preview}/${id}`)
    );
  }

  async getItemById(id: number): Promise<ShopItemFormDto> {
    return await firstValueFrom(
      this.#http.get<ShopItemFormDto>(`${this.#baseShopItemUrl}/${id}`)
    );
  }

  async getFormDatasources(): Promise<ShopItemFormDatasourceDto> {
    return await firstValueFrom(
      this.#http.get<ShopItemFormDatasourceDto>(this.#formDatasource)
    );
  }

  async createOrUpdateShopItem(item: ShopItemFormDto): Promise<ShopItemFormDto> {
    return await firstValueFrom(
      this.#http.post<ShopItemFormDto>(this.#baseShopItemUrl, item)
    );
  }

  async deleteShopItem(id: number): Promise<ShopItemFormDto> {
    return await firstValueFrom(
      this.#http.delete<ShopItemFormDto>(`${this.#baseShopItemUrl}/${id}`)
    );
  }
}
