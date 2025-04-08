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
import { ShopItemsMappingService } from './shop-items-mapping.service';

type ShopItemState = {
  items: ShopItemListItem[];
  currentPageNumber: number;
  currentPageSize: number;
  totalQty: number;
  gridFilter: ShopItemGridFilter;
  isGridLoading: boolean;

  gridDatasources: ShopItemGridDatasource;

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

  gridDatasources: {
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
    const _mapper = inject(ShopItemsMappingService);

    const loadFilteredList = async () => {
      patchState(store, { isGridLoading: true });

      const filter = _mapper.mapShopItemGridFilterToDto(store.gridFilter());
      const dto = await _apiService.getFilteredList(filter);
      const response = _mapper.mapPaginatedResponseFromDto(dto);

      // const response = _mapper.mapPaginatedResponseFromDto(
      //   await _apiService.getFilteredList(
      //     _mapper.mapShopItemGridFilterToDto(store.gridFilter())
      //   )
      // );

      patchState(store, {
        items: response.data,
        currentPageNumber: response.pageNumber,
        currentPageSize: response.pageSize,
        totalQty: response.totalQty,
        isGridLoading: false,
      });
    };

    const loadGridDatasources = async () => {
      const dto = await _apiService.getGridDatasources();
      const gridDatasources = _mapper.mapShopItemGridDatasourceFromDto(dto);
      patchState(store, { gridDatasources });
    };
    /*****************/
    // const loadPreviewById = async (id: number) => {
    //   const preview = await _apiService.getPreviewById(id);
    //   patchState(store, { preview });
    // };

    const loadPreviewById = async (id: number) => {
      const dto = await _apiService.getPreviewById(id);
      const preview = _mapper.mapShopItemPreviewFromDto(dto);
      patchState(store, { selectedItemId: id, preview });
    };

    // const loadById = async (id: number) => {
    //   const form = await _apiService.getById(id);
    //   patchState(store, { form });
    // };

    const loadItemById = async (id: number) => {
      const dto = await _apiService.getItemById(id);
      const form = _mapper.mapShopItemFormFromDto(dto);
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
      const dto = await _apiService.getFormDatasources();
      const formDatasource = _mapper.mapShopItemFormDatasourceFromDto(dto);
      patchState(store, { formDatasource });
    };

    const createOrUpdateItem = async () => {
      const item = _mapper.mapShopItemFormToDto(store.form());
      await _apiService.createOrUpdateShopItem(item);
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
      loadGridDatasources,
      loadPreviewById,
      loadItemById,
      loadFormDatasources,
      createOrUpdateItem,
      deleteItem,
      resetForm,
      setPageNumber,
      setPageSize,
    };
  })
);
