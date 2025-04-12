import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SidenavItem } from '../../model';
import { SidenavItemComponent } from '../sidenav-item/sidenav-item.component';

@Component({
  selector: 'ib-sidenav',
  standalone: true,
  imports: [
    CommonModule, MatNavList, MatListItem, MatIcon, MatListItemIcon,
    MatListItemTitle, RouterLink, RouterLinkActive, SidenavItemComponent
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {

  menuItems = input.required<SidenavItem[]>();
}
