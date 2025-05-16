import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { HeaderNavItem } from '../../model/header-nav-item.model';
import { HeaderNavItemComponent } from '../header-nav-item/header-nav-item.component';

@Component({
  selector: 'ib-header',
  imports: [CommonModule, MatToolbar, HeaderNavItemComponent, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  menuItems = input.required<HeaderNavItem[]>();
}
