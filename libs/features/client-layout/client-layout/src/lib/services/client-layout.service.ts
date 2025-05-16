import { inject, Injectable, signal } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { HeaderNavItem } from '../../../../../../shared/ui/layout/src/lib/model/header-nav-item.model';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { BasketStore } from '../../../../../restaurant-menu/src/lib/services/basket.store';

@Injectable({ providedIn: 'root' })
export class ClientLayoutService {
  readonly #basketStore = inject(BasketStore);

  getMenuItems(): HeaderNavItem[] {
    return [
      { label: 'Меню', icon: 'restaurant_menu', route: '', badge: signal<number>(0) },
      {
        label: 'Корзина',
        icon: 'shopping_cart',
        route: 'checkout',
        badge: this.#basketStore.itemCount,
      },
    ];
  }
}
