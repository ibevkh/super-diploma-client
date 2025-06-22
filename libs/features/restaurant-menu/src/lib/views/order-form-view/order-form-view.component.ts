import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatFooterCell, MatFooterCellDef, MatFooterRow, MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { Router } from '@angular/router';
import { ContainerComponent } from '@ib/ui/container';
import { ColumnComponent, HandsetDirective, RowComponent, TabletDirective, WebDirective } from '@ib/ui/grid';
import { FullWidthDirective } from '@ib/ui/width';
import { vestForms } from 'ngx-vest-forms';
import { orderRequestFormShape } from '../../models';
import { BasketStore } from '../../services/basket.store';
import { createOrderRequestValidationConfig, createOrderRequestValidationSuite } from '../../validation';

@Component({
  selector: 'ib-order-form-view',
  imports: [
    vestForms,
    ContainerComponent,
    RowComponent,
    ColumnComponent,
    WebDirective,
    TabletDirective,
    HandsetDirective,
    MatFormField,
    FullWidthDirective,
    MatLabel,
    MatInput,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatFooterCell,
    MatFooterCellDef,
    MatFooterRow,
    MatFooterRowDef,
  ],
  templateUrl: './order-form-view.component.html',
  styleUrl: './order-form-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormViewComponent {
  readonly #router = inject(Router);
  readonly #store = inject(BasketStore);

  readonly formValue = this.#store.form;
  protected readonly formValid = signal<boolean>(false);
  protected readonly loading = signal<boolean>(false);
  protected readonly errors = signal<Record<string, string>>({});

  protected readonly suite = createOrderRequestValidationSuite();
  protected readonly shape = orderRequestFormShape;
  protected readonly validationConfig = createOrderRequestValidationConfig();

  // readonly #viewModel = computed(() => ({
  //   formValue: this.formValue(),
  //   errors: this.errors(),
  //   formValid: this.formValid(),
  //   loading: this.loading(),
  //   isNew: this.formValue()?.id === 0,
  //   items: this.formValue().items || [],
  // }));
  //
  // protected get vm() {
  //   return this.#viewModel();
  // }

  readonly #viewModel = computed(() => {
    const form = this.formValue();
    const items = form.items || [];

    // const totalAmount = items.reduce(
    //   (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0),
    //   0
    // );
    const totalAmount = items.reduce(
      (sum, item) => sum + (item.price ?? 0),
      0
    );

    return {
      formValue: form,
      errors: this.errors(),
      formValid: this.formValid(),
      loading: this.loading(),
      isNew: form?.id === 0,
      items,
      totalAmount,
    };
  });

  protected get vm() {
    return this.#viewModel();
  }

  constructor() {
    //this.#store.resetForm();
  }

  async onSubmit() {
    console.log('!!!', this.vm, this.validationConfig, this.suite);
    if (this.formValid()) {
      this.loading.set(true);
      await this.#store.createOrder();
      this.loading.set(false);
      await this.#router.navigate(['']);
      console.log('Form submitted', this.formValue().totalAmount);
    } else {
      console.warn('Invalid form:', this.errors(), this.formValue());
    }
  }

  async onCancelClick() {
    await this.#router.navigate(['']);
  }

  columnsConfig = [
    { columnName: 'shopItemName', headerName: 'Назва товару' },
    { columnName: 'quantity', headerName: 'Кількість' },
    { columnName: 'price', headerName: 'Ціна' },
  ];

  get displayedColumns(): string[] {
    return this.columnsConfig.map((col) => col.columnName);
  }
}
