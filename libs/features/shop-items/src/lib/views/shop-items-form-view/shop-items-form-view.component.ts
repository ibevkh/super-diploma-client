import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/input';
import { MatLabel, MatOption, MatSelect } from '@angular/material/select';

interface Category {
  name: string;
  value: string;
}

@Component({
  selector: 'ib-shop-items-form-view',
  imports: [
    CommonModule,
    MatFormField,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
  ],
  templateUrl: './shop-items-form-view.component.html',
  styleUrl: './shop-items-form-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ShopItemsFormViewComponent {
  categories: Category[] = [
    { name: 'first category',value: 'first category'  },
    { name: 'second category',value: 'second category'  },
  ];
}
