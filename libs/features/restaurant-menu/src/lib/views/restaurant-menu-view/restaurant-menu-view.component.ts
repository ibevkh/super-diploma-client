import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardImage } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RestaurantMenuCardComponent } from '../../components';
import { RestaurantMenuStore } from '../../services';

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
  list = this.#store.categories; // Зберігаємо категорії меню

  async ngOnInit() {
    await this.#store.loadRestaurantMenu();
    // this.categories = this.#store.categories();
  }

  onClickMenu(categoryId: number) {
    // Логіка обробки кліку на категорію меню
    console.log('Category clicked: ', categoryId);
  }
}
