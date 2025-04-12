import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[ibTablet]',
  standalone: true,
})
export class TabletDirective {
  #size!: string | number | undefined;

  @Input() set ibTablet(size: string | number | undefined) {
    this.#size = size;
  }

  @HostBinding('class.tablet') get isTablet(): boolean {
    return typeof this.#size === 'number' || typeof this.#size === 'string';
  }
}
