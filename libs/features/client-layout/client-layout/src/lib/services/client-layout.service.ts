import { Injectable } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { HeaderNavItem } from '../../../../../../shared/ui/layout/src/lib/model/header-nav-item.model';

@Injectable({providedIn: 'root'})
export class ClientLayoutService {
  getMenuItems(): HeaderNavItem[] {
    return [
      { label: 'Меню', icon: 'restaurant_menu', route: '' },
      { label: 'Корзина', icon: 'shopping_cart', route: 'checkout' },
    ];
  }
}
