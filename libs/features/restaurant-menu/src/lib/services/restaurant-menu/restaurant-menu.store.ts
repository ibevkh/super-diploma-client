import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { RestaurantMenuCategoryItem } from '../../models';
import { RestaurantMenuApiService } from './restaurant-menu-api.service';
import { RestaurantMenuMappingService } from './restaurant-menu-mapping.service';

type RestaurantMenuState = {
  categories: RestaurantMenuCategoryItem[];
  isLoading: boolean;
};

const initialState: RestaurantMenuState = {
  categories: [],
  isLoading: false,
};

export const RestaurantMenuStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const _apiService = inject(RestaurantMenuApiService);
    const _mapper = inject(RestaurantMenuMappingService);

    const loadRestaurantMenu = async () => {
      patchState(store, { isLoading: true });

      const dto = await _apiService.getRestaurantMenu();
      const response = _mapper.mapRestaurantMenuDtoToModel(dto);
        patchState(store, {
        categories: response,
        isLoading: false,
      });
    };

    return { loadRestaurantMenu };
  })
);
