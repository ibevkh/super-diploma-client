import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RestaurantMenuCategoryItemDto } from '../../dtos';

@Injectable({ providedIn: 'root' })
export class RestaurantMenuApiService {
  readonly #http = inject(HttpClient);

  readonly #baseUrl = 'https://localhost:7076/api/restaurant-menu';

  async getRestaurantMenu(): Promise<RestaurantMenuCategoryItemDto[]> {
    return await firstValueFrom(
      this.#http.get<RestaurantMenuCategoryItemDto[]>(this.#baseUrl)
    );
  }
}
