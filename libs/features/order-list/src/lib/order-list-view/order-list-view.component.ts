import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { OrderListStore } from '../services/order-list.store';

@Component({
  selector: 'ib-order-list-view',
  imports: [
    CommonModule,
    MatColumnDef,
    MatFooterCell,
    MatFooterRow,
    MatFooterRowDef,
    MatPaginator,
    MatFooterCellDef,
    MatTable,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCell,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
  ],
  templateUrl: './order-list-view.component.html',
  styleUrl: './order-list-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListViewComponent implements OnInit {
  readonly #store = inject(OrderListStore);
  readonly orders = this.#store.orders;
  // readonly items = this.orders.items;

  columnsConfig: { columnName: string, headerName: string, columnType?: string }[] = [
    { columnName: 'customerName', headerName: 'Замовник' },
    { columnName: 'customerPhoneNumber', headerName: 'Телефон' },
    { columnName: 'customerAddress', headerName: 'Адреса' },
    { columnName: 'deliveryTime', headerName: 'Час доставки', columnType: 'date' },
    { columnName: 'itemNames', headerName: 'Товари' },
    { columnName: 'quantity', headerName: 'Кількість' },
    { columnName: 'totalAmount', headerName: 'Вартість' },
  ];

  paginatorSettings = computed(() => ({
    totalQty: this.#store.totalQty(),
    pageSize: this.#store.currentPageSize(),
    pageSizeOptions: [10, 20, 50, 100],
    pageNumber: this.#store.currentPageNumber(),
  }));

  get displayedColumns() {
    return this.columnsConfig.map((item) => item.columnName);
  }

  ngOnInit(): void {
    this.#store.loadOrders();
  }

  async onPageChange(event: PageEvent) {
    this.#store.setPageNumber(event.pageIndex);
    this.#store.setPageSize(event.pageSize);
    await this.#store.loadOrders();
  }
}
