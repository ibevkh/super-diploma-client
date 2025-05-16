import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientLayoutComponent } from '@ib/feat/client-layout';

@Component({
  standalone: true,
  imports: [RouterModule, ClientLayoutComponent],
  selector: 'ib-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'restaurant-client';
}
