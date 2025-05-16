import { Route } from '@angular/router';
import { OrderListViewComponent } from './order-list-view/order-list-view.component';

export const orderListRoutes: Route[] = [
  { path: '', component: OrderListViewComponent },
];
