import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '@ib/feat/admin-layout';
import { LayoutComponent } from '@ib/ui/layout';


@Component({
  imports: [RouterModule, AdminLayoutComponent],
  selector: 'ib-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'restaurant-admin';
}
