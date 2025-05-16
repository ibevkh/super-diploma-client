import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardImage } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RestaurantMenuItem } from '../../models';

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
  menuItem = input.required<RestaurantMenuItem>();
  buyClick = output<RestaurantMenuItem>();

  onBuyClick(menuItem: RestaurantMenuItem) {
    this.buyClick.emit(menuItem)
  }
}
