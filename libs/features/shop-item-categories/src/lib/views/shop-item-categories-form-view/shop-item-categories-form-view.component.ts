import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from '@ib/ui/container';
import { ColumnComponent, HandsetDirective, RowComponent, TabletDirective, WebDirective } from '@ib/ui/grid';
import { FullWidthDirective } from '@ib/ui/width';
import { FormDirective, ValidateRootFormDirective } from 'ngx-vest-forms';
import { shopItemCategoryFormShape } from '../../models';
import { ShopItemCategoryStore } from '../../services';
import {
  createShopItemCategoryValidationConfig,
  createShopItemCategoryValidationSuite
} from '../../validation';
@Component({
  selector: 'ib-shop-item-categories-form-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shop-item-categories-form-view.component.html',
  styleUrl: './shop-item-categories-form-view.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
    ContainerComponent,
    FormDirective,
    FormsModule,
    RowComponent,
    ColumnComponent,
    WebDirective,
    TabletDirective,
    HandsetDirective,
    FullWidthDirective,
    MatFormField,
    MatInput,
    ValidateRootFormDirective,
    MatLabel,
    MatFormFieldModule,
  ],
})
export class ShopItemCategoriesFormViewComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #store = inject(ShopItemCategoryStore);

  readonly formValue = this.#store.form;
  protected readonly formValid = signal<boolean>(false);
  protected readonly loading = signal<boolean>(false);
  protected readonly errors = signal<Record<string, string>>({});
  protected readonly suite = createShopItemCategoryValidationSuite();
  protected readonly shape = shopItemCategoryFormShape;
  protected readonly validationConfig =
    createShopItemCategoryValidationConfig();
  readonly #viewModel = computed(() => ({
    formValue: this.formValue(),
    errors: this.errors(),
    formValid: this.formValid(),
    loading: this.loading(),
    isNew: this.formValue()?.id === 0,
  }));

  protected get vm() {
    return this.#viewModel();
  }

  constructor() {
    if (this.#route.snapshot.paramMap.has('id')) {
      const id = Number(this.#route.snapshot.paramMap.get('id'));
      this.#store.loadCategoryById(id);
    } else {
      this.#store.resetForm();
    }
  }

  async onSubmit() {
    if (this.formValid()) {
      this.loading.set(true);
      await this.#store.createOrUpdateCategory();
      //await  this.#store.resetForm();
      this.loading.set(false);
      await this.#router.navigate(['categories']);
    } else {
      console.log('Form is invalid:', this.errors(), this.formValue());
    }
  }

  async onCancelClick() {
    await this.#router.navigate(['categories']);
  }
}
