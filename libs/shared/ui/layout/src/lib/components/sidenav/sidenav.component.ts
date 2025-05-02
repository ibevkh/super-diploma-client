import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatNavList } from '@angular/material/list';


import { SidenavItem } from '../../model';
import { SidenavItemComponent } from '../sidenav-item/sidenav-item.component';

@Component({
  selector: 'ib-sidenav',
  standalone: true,
  imports: [
    CommonModule, MatNavList, SidenavItemComponent
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {

  menuItems = input.required<SidenavItem[]>();
}
