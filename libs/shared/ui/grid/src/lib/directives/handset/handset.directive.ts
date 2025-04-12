import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[ibHandset]',
  standalone: true
})
export class HandsetDirective {
  #size!: string | number | undefined;

  @Input() set ibHandset(size: string | number | undefined) {
    this.#size = size;
  }

  @HostBinding('class.handset') get isHandset(): boolean {
    return typeof this.#size === 'number' || typeof this.#size === 'string';
  }
}
