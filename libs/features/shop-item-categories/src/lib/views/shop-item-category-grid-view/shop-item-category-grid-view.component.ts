import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  computed,
} from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ShopItemCategoryStore } from '../../services';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatTable,
  MatHeaderCell,
  MatCell,
  MatColumnDef,
  MatHeaderCellDef,
  MatCellDef,
  MatHeaderRow,
  MatRow,
  MatFooterCell,
  MatFooterCellDef,
  MatFooterRow,
  MatHeaderRowDef,
  MatRowDef,
  MatFooterRowDef,
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ib-shop-item-category-grid-view',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButton,
    MatIconButton,
    MatIcon,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatFooterCell,
    MatFooterCellDef,
    MatFooterRow,
    MatPaginator,
    MatHeaderRowDef,
    MatRowDef,
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
    return [...this.columnsConfig.map((col) => col.columnName), 'actions'];
  }

  ngOnInit(): void {
    this.#store.loadFilteredListCategory();
  }

  async onDeleteClick(id: number): Promise<void> {
    console.log('!!!', id);
    console.log('ID переданий у onDeleteClick:', id);
    if (id === undefined) {
      console.error('ID undefined! Можливо, обʼєкт не має id');
      return;
    }
    await this.#store.deleteCategory(id);
  }

  async onCreateClick(): Promise<void> {
    await this.#router.navigate(['categories', 'new']);
  }

  async onEditClick(id: number): Promise<void> {
    await this.#router.navigate(['categories', id]);
  }

  async onPageChange(e: PageEvent): Promise<void> {
    this.#store.setPageNumber(e.pageIndex);
    this.#store.setPageSize(e.pageSize);
    await this.#store.loadFilteredListCategory();
  }
}
