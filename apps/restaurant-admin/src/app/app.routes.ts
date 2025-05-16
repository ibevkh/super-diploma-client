import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'shop-items',
    loadChildren: () => import('@ib/feat/shop-items').then(m => m.shopItemsRoutes),
  },
  {
    path: 'categories',
    loadChildren: () => import('@ib/feat/shop-item-categories').then(m => m.shopItemCategoriesRoutes),
  },
  {
    path: 'order-list',
    loadChildren: () => import('@ib/feat/order-list').then(m => m.orderListRoutes),
  }
];
