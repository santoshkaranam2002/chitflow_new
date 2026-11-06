export interface LabelValue {
  label: string;
  value: string;
}

export interface IconLabel extends LabelValue {
  icon: string;
}

export interface NavItem {
  path: string;
  icon: string;
  label: string;
  badge?: string;
}

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
  count?: number;
}
