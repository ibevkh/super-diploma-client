import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  PaginatedResponseDto,
  ShopItemGridDatasourceDto,
  ShopItemFormDatasourceDto,
  ShopItemFormDto,
  ShopItemListItemDto,
  ShopItemPreviewDto,
} from '../dtos';
import {
  ShopItemGridDatasource, ShopItemForm, ShopItemFormDatasource,
  ShopItemGridFilter,
  ShopItemListItem,
  ShopItemPreview
} from '../models';
import { PaginatedResponse } from '../models/paginated-response';
import { ShopItemsMappingService } from './shop-items-mapping.service';

@Injectable({ providedIn: 'root' })
export class ShopItemApiService {
  readonly #http = inject(HttpClient);
  readonly #mapper = inject(ShopItemsMappingService);

  readonly #baseUrl = 'https://localhost:7076/api/shop-items';
  readonly #filteredGridUrl = `${this.#baseUrl}/filtered-grid`;
  readonly #gridDataSource = `${this.#baseUrl}/grid-datasources`;
  readonly #preview = `${this.#baseUrl}/preview`;
  readonly #formDatasource = `${this.#baseUrl}/form-datasources`;

  async getFilteredList(filter: ShopItemGridFilter): Promise<PaginatedResponse<ShopItemListItem[]>> {
    const filterDto = this.#mapper.mapShopItemGridFilterToDto(filter);

    return this.#mapper.mapPaginatedResponseFromDto(
      await firstValueFrom(
        this.#http.post<PaginatedResponseDto<ShopItemListItemDto[]>>(
          this.#filteredGridUrl,
          filterDto
        )
      )
    );
  }

  async getFilterDatasources(): Promise<ShopItemGridDatasource> {
    return this.#mapper.mapShopItemGridDatasourceFromDto(
      await firstValueFrom(
        this.#http.get<ShopItemGridDatasourceDto>(this.#gridDataSource)
      )
    );
  }

  async getPreviewById(id: number): Promise<ShopItemPreview> {
    const dto = await firstValueFrom(
      this.#http.get<ShopItemPreviewDto>(`${this.#preview}/${id}`)
    );

    return this.#mapper.mapShopItemPreviewFromDto(dto);
  }

  async getById(id: number): Promise<ShopItemForm> {
    const dto = await firstValueFrom(
      this.#http.get<ShopItemFormDto>(`${this.#baseUrl}/${id}`)
    );

    return this.#mapper.mapShopItemFormFromDto(dto);
  }

  async getFormDatasources(): Promise<ShopItemFormDatasource> {
    const dto = await firstValueFrom(
      this.#http.get<ShopItemFormDatasourceDto>(this.#formDatasource)
    );

    return this.#mapper.mapShopItemFormDatasourceFromDto(dto);
  }

  async createOrUpdateShopItem(item: ShopItemForm): Promise<ShopItemForm> {
    const dto = this.#mapper.mapShopItemFormToDto(item);
    const responseDto = await firstValueFrom(
      this.#http.post<ShopItemFormDto>(this.#baseUrl, dto)
    );
    return this.#mapper.mapShopItemFormFromDto(responseDto);
  }

  async deleteShopItem(id: number): Promise<ShopItemForm> {
    const responseDto = await firstValueFrom(
      this.#http.delete<ShopItemFormDto>(`${this.#baseUrl}/${id}`)
    );

    return this.#mapper.mapShopItemFormFromDto(responseDto);
  }
}
