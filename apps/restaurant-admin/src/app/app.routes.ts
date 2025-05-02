import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'shop-items',
    loadChildren: () => import('@ib/feat/shop-items').then(m => m.shopItemsRoutes),
  },
  {
    path: 'categories',
    loadChildren: () => import('@ib/feat/categories').then(m => m.categoriesRoutes),
  },
];
