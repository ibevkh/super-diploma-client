import { Injectable } from '@angular/core';
import { SidenavItem } from '@ib/ui/layout';

@Injectable({providedIn: 'root'})
export class AdminLayoutService {
  getMenuItems(): SidenavItem[] {
    return [
      { label: 'Home', icon: 'home', route: '' },
      { label: 'Categories', icon: 'category', route: 'categories' },
      { label: 'ShopItems', icon: 'shopping', route: 'shop-items' },
    ];
  }
}
