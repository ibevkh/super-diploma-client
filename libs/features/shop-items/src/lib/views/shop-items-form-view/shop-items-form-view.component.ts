import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { ContainerComponent } from '@ib/ui/container';
import { ColumnComponent, HandsetDirective, RowComponent, TabletDirective, WebDirective } from '@ib/ui/grid';
import { FullWidthDirective } from '@ib/ui/width';
import { vestForms } from 'ngx-vest-forms';
import { shopItemFormShape } from '../../models';
import { ShopItemStore } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { createShopItemValidationConfig, createShopItemValidationSuite } from '../../validation';

@Component({
  selector: 'ib-shop-items-form-view',
  imports: [
    CommonModule,
    MatFormField,
    MatFormField,
    MatLabel,
    vestForms,
    MatInput,
    MatError,
    MatButtonModule,
    MatOption,
    MatSelect,
    ContainerComponent,
    RowComponent,
    WebDirective,
    TabletDirective,
    HandsetDirective,
    ColumnComponent,
    FullWidthDirective,
  ],
  templateUrl: './shop-items-form-view.component.html',
  styleUrl: './shop-items-form-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ShopItemsFormViewComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #store = inject(ShopItemStore);

  readonly formValue = this.#store.form;
  readonly datasources = this.#store.formDatasource;
  protected readonly formValid = signal<boolean>(false);
  protected readonly loading = signal<boolean>(false);
  protected readonly errors = signal<Record<string, string>>({});
  protected readonly suite = createShopItemValidationSuite();
  protected readonly shape = shopItemFormShape;
  protected readonly validationConfig = createShopItemValidationConfig();
  readonly #viewModel = computed(() => {
    return {
      formValue: this.formValue(),
      datasources: this.datasources(),
      errors: this.errors(),
      formValid: this.formValid(),
      loading: this.loading(),
      isNew: this.formValue()?.id === 0,
    };
  });

  protected get vm() {
    return this.#viewModel();
  }

  constructor() {
    this.#store.loadFormDatasources();
    if (this.#route.snapshot.paramMap.has('id')) {
      console.log(this.#route.snapshot.paramMap);
      const id = Number(this.#route.snapshot.paramMap.get('id')); //ESLint: 'id' is assigned a value but never used.
      this.#store.loadItemById(id);
    } else {
      console.log('new transaction');
      this.#store.resetForm();
    }
  }

  async onSubmit() {
    if (this.formValid()) {
      console.log('Submitting...', this.formValue());
      await this.#store.createOrUpdateItem();
      await this.#store.resetForm();
      await this.#router.navigate(['shop-items']);
    } else {
      console.log('Not valid...', this.errors(), this.formValue());
    }
  }

  async onCancelClick() {
    await this.#router.navigate(['shop-items']);
  }
}
