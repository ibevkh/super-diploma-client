import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShopItemCategoryStore } from '../../services/shop-item-category.store';

@Component({
  selector: 'ib-shop-item-categories-form-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-item-categories-form-view.component.html',
  styleUrl: './shop-item-categories-form-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemCategoriesFormViewComponent {
}
