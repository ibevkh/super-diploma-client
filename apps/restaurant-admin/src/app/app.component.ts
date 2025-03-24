import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '@ib/ui/layout';


@Component({
  imports: [RouterModule, LayoutComponent],
  selector: 'ib-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'restaurant-admin';
}
