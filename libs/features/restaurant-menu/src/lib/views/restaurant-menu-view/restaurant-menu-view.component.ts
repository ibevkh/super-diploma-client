import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardImage } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RestaurantMenuCardComponent } from '../../components';
import { RestaurantMenuItem } from '../../models';
import { RestaurantMenuStore } from '../../services';
import { BasketStore } from '../../services/basket.store';

@Component({
  selector: 'ib-restaurant-menu-view',
  imports: [
    CommonModule,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardImage,
    MatIcon,
    MatIconButton,
    RestaurantMenuCardComponent,
  ],
  templateUrl: './restaurant-menu-view.component.html',
  styleUrl: './restaurant-menu-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantMenuViewComponent implements OnInit {
  readonly #store = inject(RestaurantMenuStore);
  categories = this.#store.categories; // Зберігаємо категорії меню
  readonly #basketStore = inject(BasketStore);

  async ngOnInit() {
    await this.#store.loadRestaurantMenu();
  }

  addToOrder(item: RestaurantMenuItem) {
    this.#basketStore.addItem(item);
  }
}
