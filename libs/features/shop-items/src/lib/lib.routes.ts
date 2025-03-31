import { Route } from '@angular/router';
import { ShopItemsFormViewComponent } from './views/shop-items-form-view/shop-items-form-view.component';
import { ShopItemsGridViewComponent } from './views/shop-items-grid-view/shop-items-grid-view.component';

export const shopItemsRoutes: Route[] = [
  { path: '', component: ShopItemsGridViewComponent },
  { path: ':id', component: ShopItemsFormViewComponent },
  { path: 'new', component: ShopItemsFormViewComponent },
];
