import { Route } from '@angular/router';
import { OrderFormViewComponent } from './views/order-form-view/order-form-view.component';
import { RestaurantMenuViewComponent } from './views/restaurant-menu-view/restaurant-menu-view.component';

export const restaurantMenuRoutes: Route[] = [
  { path: '', component: RestaurantMenuViewComponent },
  { path: 'checkout', component: OrderFormViewComponent}
];
