import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  ShopItemFilterDatasource,
  ShopItemForm,
  ShopItemFormDatasource,
  ShopItemGridFilter,
  ShopItemListItem,
  ShopItemPreview,
} from '../models';
import { ShopItemApiService } from './shop-items-api.service';

type ShopItemState = {
  items: ShopItemListItem[];
  currentPageNumber: number;
  currentPageSize: number;
  totalQty: number;
  gridFilter: ShopItemGridFilter;
  isGridLoading: boolean;

  filterDatasources: ShopItemFilterDatasource;

  selectedItemId?: number;

  /*****************/
  preview: ShopItemPreview;
  form: ShopItemForm;
  formDatasource: ShopItemFormDatasource;
};

const initialState: ShopItemState = {
  items: [],
  currentPageNumber: 0,
  currentPageSize: 10,
  totalQty: 0,
  gridFilter: { pageNumber: 0, pageSize: 10 },
  isGridLoading: false,

  filterDatasources: {
    states: [],
    categories: [],
  },

  selectedItemId: undefined,
  /*****************/
  preview: {
    id: 0,
    name: '',
    description: '',
    state: 0,
    categoryName: '',
    categoryDescription: '',
    image: '',
  },

  form: {
    id: 0,
    name: '',
    description: '',
    state: 0,
    image: '',
    categoryId: 0,
  },

  formDatasource: {
    categories: [],
    states: [],
  },
};

export const ShopItemStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const _apiService = inject(ShopItemApiService);

    const loadFilteredList = async () => {
      patchState(store, { isGridLoading: true });

      const paginatedResponse = await _apiService.getFilteredList(
        store.gridFilter()
      );
      patchState(store, {
        items: paginatedResponse.data,
        currentPageNumber: paginatedResponse.pageNumber,
        currentPageSize: paginatedResponse.pageSize,
        totalQty: paginatedResponse.totalQty,
        isGridLoading: false,
      });
    };

    const loadFilterDatasources = async () => {
      const filterDatasources = await _apiService.getFilterDatasources();
      patchState(store, { filterDatasources });
    };
    /*****************/
    const loadPreviewById = async (id: number) => {
      const preview = await _apiService.getPreviewById(id);
      patchState(store, { preview });
    };

    const loadById = async (id: number) => {
      const form = await _apiService.getById(id);
      patchState(store, { form });
    };

    const loadFormDatasources = async () => {
      const formDatasource = await _apiService.getFormDatasources();
      patchState(store, { formDatasource });
    };

    /*****************/
    return {
      loadFilteredList,
      loadFilterDatasources,
      loadPreviewById,
      loadById,
      loadFormDatasources,
    };
  })
);
