import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { HeaderComponent } from '../../../../../../../shared/ui/layout/src/lib/components/header/header.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { HeaderNavItem } from '../../../../../../../shared/ui/layout/src/lib/model/header-nav-item.model';
import { ClientLayoutService } from '../../services/client-layout.service';

@Component({
  selector: 'ib-client-layout',
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  standalone: true,
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLayoutComponent implements OnInit {
  #clientServiceLayout = inject(ClientLayoutService);

  menuItems: HeaderNavItem[] = [];

  ngOnInit(): void {
    this.menuItems = this.#clientServiceLayout.getMenuItems();
  }
}
