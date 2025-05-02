import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatFooterCell, MatFooterCellDef, MatFooterRow, MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ShopItemCategoryStore } from '../../services/shop-item-category.store';

@Component({
  selector: 'ib-shop-item-category-grid-view',
  standalone: true,

  imports: [
    MatToolbarModule,
    MatButton,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatIcon,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatFooterCell,
    MatPaginator,
    MatFooterRow,
    MatHeaderRowDef,
    MatRowDef,
    MatFooterCellDef,
    MatFooterRowDef,
  ],
  templateUrl: './shop-item-category-grid-view.component.html',
  styleUrl: './shop-item-category-grid-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemCategoryGridViewComponent implements OnInit {
  readonly #store = inject(ShopItemCategoryStore);
  readonly #router = inject(Router);

  readonly items = this.#store.items;
  readonly filter = this.#store.gridFilter;

  readonly paginatorSettings = computed(() => ({
    pageSize: this.filter().pageSize,
    pageNumber: this.filter().pageNumber,
    totalQty: this.#store.totalQty(),
    pageSizeOptions: [10, 20],
  }));

  columnsConfig = [
    { columnName: 'name', headerName: 'Назва' },
    { columnName: 'description', headerName: 'Опис' },
  ];

  get displayedColumns() {
    return this.columnsConfig.map((item) => item.columnName);
  }

  ngOnInit(): void {
    this.#store.loadFilteredListCategory(); // ініціалізація категорій при завантаженні
  }

  async onDeleteClick(id: number): Promise<void> {
    await this.#store.deleteCategory(id);
  }

  async onCreateClick(): Promise<void> {
    await this.#router.navigate(['categories-form']);
  }

  // onFilterChange(): void {
  //   this.#store.loadFilteredListCategory();
  // }

  async onPageChange(e: PageEvent): Promise<void> {
    this.#store.setPageNumber(e.pageIndex);
    this.#store.setPageSize(e.pageSize);
    await this.#store.loadFilteredListCategory();
  }
}
