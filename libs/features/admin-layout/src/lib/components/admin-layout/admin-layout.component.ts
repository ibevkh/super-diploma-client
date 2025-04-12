import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent, SidenavItem } from '@ib/ui/layout';
import { AdminLayoutService } from '../../services/admin-layout.service';

@Component({
  selector: 'ib-admin-layout',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit {
  #adminLayoutService = inject(AdminLayoutService);

  menuItems: SidenavItem[] = [];

  ngOnInit() {
    this.menuItems = this.#adminLayoutService.getMenuItems();
  }
}
