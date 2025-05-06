import { Route } from '@angular/router';
import { ShopItemsFormViewComponent, ShopItemsGridViewComponent } from './views';

export const shopItemsRoutes: Route[] = [
  { path: '', component: ShopItemsGridViewComponent },
  { path: 'new', component: ShopItemsFormViewComponent },
  { path: ':id', component: ShopItemsFormViewComponent },
  // { path: 'categories', component: ShopItemCategoryGridViewComponent},
  // { path: 'categories-form', component: ShopItemCategoriesFormViewComponent},
];
