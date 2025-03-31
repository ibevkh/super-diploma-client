import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  PaginatedResponseDto,
  ShopItemFilterDatasourceDto,
  ShopItemFormDatasourceDto,
  ShopItemFormDto,
  ShopItemListItemDto,
  ShopItemPreviewDto,
} from '../dtos';
import {
  ShopItemFilterDatasource, ShopItemForm, ShopItemFormDatasource,
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
  readonly #filteredDataSource = `${this.#baseUrl}/filter-datasources`;
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

  async getFilterDatasources(): Promise<ShopItemFilterDatasource> {
    return this.#mapper.mapShopItemFilterDatasourceFromDto(
      await firstValueFrom(
        this.#http.get<ShopItemFilterDatasourceDto>(this.#filteredDataSource)
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
}
