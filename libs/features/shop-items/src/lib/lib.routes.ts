import { Route } from '@angular/router';
import { ShopItemsFormViewComponent } from './views/shop-items-form-view/shop-items-form-view.component';
import { ShopItemsGridViewComponent } from './views/shop-items-grid-view/shop-items-grid-view.component';

export const shopItemsRoutes: Route[] = [
  { path: '', component: ShopItemsGridViewComponent },
  { path: 'new', component: ShopItemsFormViewComponent },
  { path: ':id', component: ShopItemsFormViewComponent },
];
