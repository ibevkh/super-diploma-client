import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

import { ContainerComponent } from '@ib/ui/container';
import { ColumnComponent, RowComponent, TabletDirective, WebDirective } from '@ib/ui/grid';
import { SidenavItem } from '../../model';

import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'ib-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, MatSidenav,
    MatSidenavContainer, MatSidenavContent, SidenavComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  menuItems = input<SidenavItem[]>([]);
}
