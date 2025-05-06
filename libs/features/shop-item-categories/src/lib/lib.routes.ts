import { Route } from '@angular/router';
import { ShopItemCategoriesFormViewComponent, ShopItemCategoryGridViewComponent } from './views';

export const shopItemCategoriesRoutes: Route[] = [
  { path: '', component: ShopItemCategoryGridViewComponent },
  { path: 'new', component: ShopItemCategoriesFormViewComponent },
  { path: ':id', component: ShopItemCategoriesFormViewComponent },
];
