import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  PaginatedResponseDto,
  ShopItemGridDatasourceDto,
  ShopItemFormDatasourceDto,
  ShopItemFormDto,
  ShopItemListItemDto,
  ShopItemPreviewDto, ShopItemGridFilterDto
} from '../dtos';

@Injectable({ providedIn: 'root' })
export class ShopItemApiService {
  readonly #http = inject(HttpClient);

  readonly #baseUrl = 'https://localhost:7076/api/shop-items';
  readonly #filteredGridUrl = `${this.#baseUrl}/filtered-grid`;
  readonly #gridDataSource = `${this.#baseUrl}/grid-datasources`;
  readonly #preview = `${this.#baseUrl}/preview`;
  readonly #formDatasource = `${this.#baseUrl}/form-datasources`;

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
      this.#http.get<ShopItemFormDto>(`${this.#baseUrl}/${id}`)
    );
  }

  async getFormDatasources(): Promise<ShopItemFormDatasourceDto> {
    return await firstValueFrom(
      this.#http.get<ShopItemFormDatasourceDto>(this.#formDatasource)
    );
  }

  async createOrUpdateShopItem(item: ShopItemFormDto): Promise<ShopItemFormDto> {
    return await firstValueFrom(
      this.#http.post<ShopItemFormDto>(this.#baseUrl, item)
    );
  }

  async deleteShopItem(id: number): Promise<ShopItemFormDto> {
    return await firstValueFrom(
      this.#http.delete<ShopItemFormDto>(`${this.#baseUrl}/${id}`)
    );
  }
}
