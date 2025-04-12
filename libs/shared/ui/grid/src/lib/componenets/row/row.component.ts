import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ib-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent {}
