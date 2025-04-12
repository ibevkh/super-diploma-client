import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ib-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {
  @Input() mode: 'flex' | 'flex-row' | 'flex-row-space' | 'fluid' | null = null;
  @Input() height: 'max-height' | null = null;

  @HostBinding('class.is-flex') get isFlex(): boolean {
    return this.mode === 'flex';
  }

  @HostBinding('class.is-flex-row') get isFlexRow(): boolean {
    return this.mode === 'flex-row';
  }

  @HostBinding('class.is-flex-row-space') get isFlexRowSpace(): boolean {
    return this.mode === 'flex-row-space';
  }

  @HostBinding('class.is-fluid') get isFluid(): boolean {
    return this.mode === 'fluid';
  }

  @HostBinding('class.is-max-height') get isMaxHeight(): boolean {
    return this.height === 'max-height';
  }
}
