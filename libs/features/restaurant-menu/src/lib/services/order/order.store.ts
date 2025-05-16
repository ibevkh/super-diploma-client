import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { OrderGrid, OrderRequest } from '../../models';
import { OrderApiService } from './order-api.services';
import { OrderMappingServices } from './order-mapping.services';

type OrderState = {
  orders: OrderGrid[];
  form: OrderRequest;
};

const initialForm: OrderRequest = {
  id: 0,
  customerName: '',
  customerPhoneNumber: '',
  deliveryAddress: '',
  deliveryTime: '',
  items: [],
};

const initialState: OrderState = {
  orders: [],
  form: initialForm,
};

export const OrderStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const _api = inject(OrderApiService);
    const _mapper = inject(OrderMappingServices);

    const createOrder = async () => {
      const order = _mapper.mapOrderRequestToDto(store.form());
      await _api.createOrder(order);
      await resetForm();
    }

    const resetForm = async () => {
      patchState(store, {form: {...initialForm}})
    }

    return {
      createOrder,
      resetForm,
    };
  })
);
