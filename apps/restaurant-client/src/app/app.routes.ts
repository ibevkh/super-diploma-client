import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@ib/feat/restaurant-menu').then(m => m.restaurantMenuRoutes)}
];
