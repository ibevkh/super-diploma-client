import { Route } from '@angular/router';
import {
  ShopItemCategoriesFormViewComponent
} from './views/shop-item-categories-form-view/shop-item-categories-form-view.component';
import { ShopItemCategoryGridViewComponent } from './views/shop-item-category-grid-view/shop-item-category-grid-view.component';
import { ShopItemsFormViewComponent } from './views/shop-items-form-view/shop-items-form-view.component';
import { ShopItemsGridViewComponent } from './views/shop-items-grid-view/shop-items-grid-view.component';

export const shopItemsRoutes: Route[] = [
  { path: '', component: ShopItemsGridViewComponent },
  { path: 'new', component: ShopItemsFormViewComponent },
  { path: ':id', component: ShopItemsFormViewComponent },
  // { path: 'categories', component: ShopItemCategoryGridViewComponent},
  // { path: 'categories-form', component: ShopItemCategoriesFormViewComponent},
];

export const categoriesRoutes: Route[] = [
  { path: '', component: ShopItemCategoryGridViewComponent },
  { path: 'new', component: ShopItemCategoriesFormViewComponent },
  { path: ':id', component: ShopItemCategoriesFormViewComponent },
]
