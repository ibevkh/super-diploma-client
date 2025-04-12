import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[ibWeb]',
  standalone: true,
})
export class WebDirective {
  #size!: string | number | undefined;

  @Input() set ibWeb(size: string | number | undefined) {
    this.#size = size;
  }

  @HostBinding('class.web') get isWeb(): boolean {
    return typeof this.#size === 'number' || typeof this.#size === 'string';
  }
}
