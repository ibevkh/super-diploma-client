import {
  ChangeDetectionStrategy,
  Component, computed,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatFooterCell, MatFooterCellDef, MatFooterRow, MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { patchState } from '@ngrx/signals';
import { ShopItemListItem } from '../../models';
import { ShopItemStore } from '../../services';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'ib-shop-items-grid-view',
  imports: [
    CommonModule,
    MatToolbar,
    MatToolbarRow,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    FormsModule,
    MatTable,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatAnchor,
    RouterLink,
    MatButton,
    MatPaginatorModule,
    MatFooterCellDef,
    MatFooterCell,
    MatFooterRow,
    MatFooterRowDef,
  ],
  templateUrl: './shop-items-grid-view.component.html',
  styleUrl: './shop-items-grid-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ShopItemsGridViewComponent implements OnInit {
  readonly #store = inject(ShopItemStore);
  readonly #router = inject(Router);

  items = this.#store.items;
  datasources = this.#store.filterDatasources;
  preview = this.#store.preview;
  filter = this.#store.gridFilter;

  isPreviewVisible = signal(false);

  columnsConfig = [
    { columnName: 'name', headerName: 'Назва' },
    { columnName: 'description', headerName: 'Опис' },
    { columnName: 'state', headerName: 'Стан' },
    { columnName: 'categoryName', headerName: 'Категорія' },
    { columnName: 'categoryDescription', headerName: 'Опис категорії' },
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
    this.#store.loadFilterDatasources();
    this.#store.loadFilteredList();
  }

  onFilterChange() {
    this.#store.loadFilteredList();
  }

  onGridClick(item: ShopItemListItem) {
    this.#store.loadPreviewById(item.id);
    this.isPreviewVisible.set(true);
  }

  onDeleteClick(id: number) {
    this.#store.deleteItem(id);
    this.isPreviewVisible.set(false);
  }

  async onCreateClick() {
    await this.#router.navigate(['shop-items', 'new']);
  }

  async onPageChange(e: PageEvent) {
    this.#store.setPageNumber(e.pageIndex)
    this.#store.setPageSize(e.pageSize);
    await this.#store.loadFilteredList();
  }
}
