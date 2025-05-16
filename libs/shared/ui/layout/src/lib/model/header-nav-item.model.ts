import { Signal } from '@angular/core';

export interface HeaderNavItem {
  label: string;
  route?: string;
  icon?: string;
  children?: HeaderNavItem[];
  badge: Signal<number>;
}
