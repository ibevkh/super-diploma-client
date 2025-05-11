import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardImage } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RestaurantMenuCategoryItem } from '../../models';

@Component({
  selector: 'ib-restaurant-menu-card',
  imports: [
    CommonModule,
    MatCard,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    MatIcon,
  ],

  templateUrl: './restaurant-menu-card.component.html',
  styleUrl: './restaurant-menu-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantMenuCardComponent {
  restaurantMenu = input.required<RestaurantMenuCategoryItem>();
  restaurantMenuClick = output<number>();

  onClickMenu(categoryMenu: RestaurantMenuCategoryItem ) {
    this.restaurantMenuClick.emit(categoryMenu.id);
  }
}
