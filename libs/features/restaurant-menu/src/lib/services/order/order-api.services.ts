import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {  OrderRequestDto } from '../../dtos';

@Injectable({ providedIn: 'root' })
export class OrderApiService {
  readonly #http = inject(HttpClient);

  readonly #baseUrl = 'https://localhost:7076/api/order';
  readonly #createOrder = `${this.#baseUrl}/create-order`;

  async createOrder(orderRequest: OrderRequestDto): Promise<OrderRequestDto> {
    return await firstValueFrom(
      this.#http.post<OrderRequestDto>(this.#createOrder, orderRequest)
    );
  }
}
