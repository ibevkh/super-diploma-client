import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListItem } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'ib-layout',
  imports: [
    CommonModule,
    MatSidenavContainer,
    MatSidenavContent,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatSidenav,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LayoutComponent {}
