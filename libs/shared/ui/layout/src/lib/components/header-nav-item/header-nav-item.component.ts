import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HeaderNavItem } from '../../model/header-nav-item.model';

@Component({
  selector: 'ib-header-nav-item',
  standalone: true,
  imports: [CommonModule, MatButton, RouterLink, MatIconModule],
  templateUrl: './header-nav-item.component.html',
  styleUrl: './header-nav-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNavItemComponent {
  item = input.required<HeaderNavItem>();
}
