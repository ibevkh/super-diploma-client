import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { OrderGrid, OrderRequest } from '../../models';
import { OrderGridFilter } from '../../models/order/order-grid-filter';
import { OrderApiService } from './order-api.services';
import { OrderMappingServices } from './order-mapping.services';

type OrderState = {
  orders: OrderGrid[];
  isLoading: boolean;
  isGridLoading: boolean;

  gridFilter: OrderGridFilter;
  totalQty: number;
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
  isLoading: false,
  isGridLoading: false,

  gridFilter:{
    pageNumber: 0,
    pageSize: 10,
  },
  totalQty: 0,

  form: initialForm,
};

export const OrderStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const _api = inject(OrderApiService);
    const _mapper = inject(OrderMappingServices);

    const loadOrders = async () => {
      patchState(store, { isGridLoading: true });

      const filter = _mapper.mapOrderGridFilterToDto(store.gridFilter());
      const dto = await _api.getOrdersReview(filter);
      const response = _mapper.mapOrderGridDtoToModel(dto.data);

      patchState(store, {
        orders: response,
        totalQty: dto.totalQty,
        isGridLoading: false,
      })
    }

    const createOrder = async () => {
      const order = _mapper.mapOrderRequestToDto(store.form());
      await _api.createOrder(order);
      await resetForm();
    }

    const resetForm = async () => {
      patchState(store, {form: {...initialForm}})
    }

    return {
      loadOrders,
      createOrder,
      resetForm,
    };
  })
);
