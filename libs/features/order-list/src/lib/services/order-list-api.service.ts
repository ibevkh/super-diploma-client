import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginatedResponseDto } from '@ib/core/dto';
import { firstValueFrom } from 'rxjs';
import { OrderGridFilterDto } from '../dtos/order-grid-filter.dto';
import { OrderGridDto } from '../dtos/order-grid.dto';

@Injectable({ providedIn: 'root' })
export class OrderListApiService {
  readonly #http = inject(HttpClient);

  readonly #baseUrl = 'http://localhost:5001/api/order';
  readonly #review = `${this.#baseUrl}/review`;

  async getOrdersReview(
    filter: OrderGridFilterDto
  ): Promise<PaginatedResponseDto<OrderGridDto[]>> {
    return await firstValueFrom(
      this.#http.post<PaginatedResponseDto<OrderGridDto[]>>(
        this.#review,
        filter
      )
    );
  }
}
