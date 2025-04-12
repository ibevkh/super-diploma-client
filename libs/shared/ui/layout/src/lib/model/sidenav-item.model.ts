export interface SidenavItem {
  label: string;
  icon: string;
  route?: string;
  children?: SidenavItem[];
}
