import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatListItemMeta, MatListItemTitle } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SidenavItem } from '../../model';

@Component({
  selector: 'ib-sidenav-item',
  standalone: true,
  imports: [
    CommonModule, MatIcon, MatListItem, MatListItemIcon,
    MatListItemTitle, RouterLinkActive, RouterLink, MatListItemMeta
  ],
  templateUrl: './sidenav-item.component.html',
  styleUrl: './sidenav-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expandSubMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('200ms ease-in-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ opacity: 0, height: '0px' })),
      ]),
    ]),
  ]
})
export class SidenavItemComponent {
  item = input.required<SidenavItem>();
  collapsed = input(false);
  nestedMenuOpen = signal(false);

  toggleNested() {
    if (!this.item().children) {
      return;
    }

    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }
}
