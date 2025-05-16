import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { OrderGrid } from '../models';
import { OrderGridFilter } from '../models';
import { OrderRequest } from '../models';
import { OrderListApiService } from './order-list-api.service';
import { OrderListMappingServices } from './order-list-mapping';

type OrderState = {
  orders: OrderGrid[];
  isLoading: boolean;
  isGridLoading: boolean;
  currentPageNumber: number;
  currentPageSize: number;

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
  currentPageNumber: 0,
  currentPageSize: 10,

  gridFilter:{
    pageNumber: 0,
    pageSize: 10,
  },
  totalQty: 0,

  form: initialForm,
};

export const OrderListStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const _api = inject(OrderListApiService);
    const _mapper = inject(OrderListMappingServices);

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
// методи для пагінації
    const setPageSize = (pageSize: number) => {
      patchState(store, {
        gridFilter: {
          ...store.gridFilter(),
          pageSize,
        },
      });
    };

    const setPageNumber = (pageNumber: number) => {
      patchState(store, {
        gridFilter: {
          ...store.gridFilter(),
          pageNumber,
        },
      });
    };

    return {
      loadOrders,
      setPageSize,
      setPageNumber,
    };
  })
);
