import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatDivider } from '@angular/material/list';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { Router } from '@angular/router';
import { ContainerComponent } from '@ib/ui/container';
import { ColumnComponent, HandsetDirective, RowComponent, TabletDirective, WebDirective } from '@ib/ui/grid';
import { FullWidthDirective } from '@ib/ui/width';
import { FormDirective, ValidateRootFormDirective } from 'ngx-vest-forms';
import { OrderRequestFormShape } from '../../models';
import { BasketStore } from '../../services/basket.store';
import { createOrderRequestValidationConfig, createOrderRequestValidationSuite } from '../../validation';

@Component({
  selector: 'ib-order-form-view',
  imports: [
    ContainerComponent,
    FormDirective,
    FormsModule,
    ValidateRootFormDirective,
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
    MatCard,
    MatCardTitle,
    MatDivider,
    MatCardContent,
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
  protected readonly shape = OrderRequestFormShape;
  protected readonly validationConfig = createOrderRequestValidationConfig();

  readonly #viewModel = computed(() => ({
    formValue: this.formValue(),
    errors: this.errors(),
    formValid: this.formValid(),
    loading: this.loading(),
    isNew: this.formValue()?.id === 0,
    items: this.formValue().items || [],
  }));

  protected get vm() {
    return this.#viewModel();
  }

  constructor() {
    //this.#store.resetForm();
  }

  async onSubmit() {
    if (this.formValid()) {
      this.loading.set(true);
      await this.#store.createOrder();
      this.loading.set(false);
      await this.#router.navigate(['']);
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
