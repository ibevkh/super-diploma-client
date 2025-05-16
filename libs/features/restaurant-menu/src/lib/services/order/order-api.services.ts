import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginatedResponseDto } from '@ib/core/dto';
import { firstValueFrom } from 'rxjs';
import { OrderGridDto, OrderGridFilterDto, OrderRequestDto } from '../../dtos';

@Injectable({ providedIn: 'root' })
export class OrderApiService {
  readonly #http = inject(HttpClient);

  readonly #baseUrl = 'https://localhost:7076/api/order';
  readonly #review = `${this.#baseUrl}/reviews`;
  readonly #createOrder = `${this.#baseUrl}/createOrder`;

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

  async createOrder(orderRequest: OrderRequestDto): Promise<OrderRequestDto> {
    return await firstValueFrom(
      this.#http.post<OrderRequestDto>(this.#createOrder, orderRequest)
    );
  }
}
