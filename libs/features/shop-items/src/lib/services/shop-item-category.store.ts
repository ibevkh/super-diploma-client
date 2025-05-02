import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ShopItemCategoryForm } from '../models/shop-item-categories/shop-item-category-form';
import { ShopItemCategoryGrid } from '../models/shop-item-categories/shop-item-category-grid';
import { ShopItemCategoryGridFilter } from '../models/shop-item-categories/shop-item-category-grid-filter';
import { ShopItemCategoriesApiService } from './shop-item-categories-api.services';
import { ShopItemCategoryMappingService } from './shop-items-category-mapping.service';

type ShopItemCategoryState = {
  items: ShopItemCategoryGrid[];
  isGridLoading: boolean;
  gridFilter: ShopItemCategoryGridFilter;

  totalQty: number; // <---  загальна кількість
  selectedItemId: number | undefined;
  form: ShopItemCategoryForm;
};

const initialForm: ShopItemCategoryForm = {
  id: 0,
  name: '',
  description: '',
};

const initialState: ShopItemCategoryState = {
  items: [],
  isGridLoading: false,
  gridFilter: {
    pageNumber: 0,
    pageSize: 10,
  },
  totalQty: 0, // <--- ініціалізуємо
  selectedItemId: undefined,
  form: { ...initialForm },
};

export const ShopItemCategoryStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const _apiService = inject(ShopItemCategoriesApiService);
    const _mapper = inject(ShopItemCategoryMappingService);

    const loadFilteredListCategory = async () => {
      patchState(store, { isGridLoading: true });

      const filter = _mapper.mapShopItemCategoryGridFilterToDto(store.gridFilter());
      const dto = await _apiService.getFilteredListCategory(filter);
      const categories = _mapper.mapShopItemCategoryGridListFromDto(dto.data);

      patchState(store, {
        items: categories,
        totalQty: dto.totalQty, // <-- оновлюємо кількість
        isGridLoading: false,
      });
    };

    const loadCategoryById = async (id: number) => {
      const dto = await _apiService.getCategoryById(id);
      const form = _mapper.mapShopItemCategoryFormFromDto(dto);
      patchState(store, { form, selectedItemId: id });
    };

    const createOrUpdateCategory = async () => {
      const category = _mapper.mapShopItemCategoryFormToDto(store.form());
      await _apiService.createOrUpdateCategory(category);
      patchState(store, { form: undefined });
    };

    const deleteCategory = async (id: number) => {
      await _apiService.deleteCategory(id);
      patchState(store, { selectedItemId: undefined });
      await loadFilteredListCategory();
    };

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
      loadFilteredListCategory,
      loadCategoryById,
      createOrUpdateCategory,
      deleteCategory,
      setPageSize,
      setPageNumber,
    };
  })
);
