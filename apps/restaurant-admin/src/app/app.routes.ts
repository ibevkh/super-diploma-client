import { Route } from '@angular/router';

//import { shopItemsRoutes } from '@ib/feat/shop-items';

export const appRoutes: Route[] = [
  {
    path: 'shop-items',
    loadChildren: () => import('@ib/feat/shop-items').then(m => m.shopItemsRoutes),
  },
  // { path: 'shop-items', loadChildren: () => shopItemsRoutes },
];
