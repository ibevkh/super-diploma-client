import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  ShopItemGridDatasource,
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

  filterDatasources: ShopItemGridDatasource;

  selectedItemId: number | undefined;

  /*****************/
  preview: ShopItemPreview;
  form: ShopItemForm;
  formDatasource: ShopItemFormDatasource;
};

const initialForm: ShopItemForm = {
  id: 0,
  name: '',
  description: '',
  image: 'test',
  state: undefined,
  categoryId: undefined,
}

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

  form: {...initialForm},

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
    // const loadPreviewById = async (id: number) => {
    //   const preview = await _apiService.getPreviewById(id);
    //   patchState(store, { preview });
    // };

    const loadPreviewById = async (id: number) => {
      const preview = await _apiService.getPreviewById(id);
      patchState(store, { selectedItemId: id, preview });
    };

    // const loadById = async (id: number) => {
    //   const form = await _apiService.getById(id);
    //   patchState(store, { form });
    // };

    const loadById = async (id: number) => {
      const form = await _apiService.getById(id);
      patchState(store, { selectedItemId: id, form });
    };

    // const deleteItem = async () => {
    //   if (store.selectedItemId() === undefined) return;
    //   await _apiService.deleteShopItem(store.selectedItemId() as number);
    //   patchState(store, {
    //     selectedItemId: undefined,
    //   });
    //   await loadFilteredList();
    // }

    const loadFormDatasources = async () => {
      const formDatasource = await _apiService.getFormDatasources();
      patchState(store, { formDatasource });
    };

    const createOrUpdateItem = async () => {
      await _apiService.createOrUpdateShopItem(store.form());
      patchState(store, { form: undefined });
    };

    const deleteItem = async (id: number) => {
      await _apiService.deleteShopItem(id);
      patchState(store, {
        selectedItemId: undefined,
      });
      await loadFilteredList();
    }

    // const selectItem = async (id: number) => {
    //   patchState(store, { selectedItemId: id });
    // }

    const resetForm = async () => {
      patchState(store, { form: {...initialForm} })
      console.log("store.resetForm()", store.form(), initialForm);
    };

    const setPageNumber = (pageNumber: number) => {
      patchState(store, { gridFilter: { ...store.gridFilter(), pageNumber } });
    };

    const setPageSize = (pageSize: number) => {
      patchState(store, { gridFilter: { ...store.gridFilter(), pageSize } });
    };

    /*****************/
    return {
      loadFilteredList,
      loadFilterDatasources,
      loadPreviewById,
      loadById,
      loadFormDatasources,
      createOrUpdateItem,
      deleteItem,
      resetForm,
      setPageNumber,
      setPageSize,
    };
  })
);
