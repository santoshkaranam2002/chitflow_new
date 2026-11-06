export type ReportPeriod = '3M' | '6M' | '1Y';

export interface ChartPoint {
  label: string;
  value: number;
}

export interface ReportSummary {
  total: number;
  change: number;
  points: ChartPoint[];
}

export interface GroupReportRow {
  group: string;
  members: number;
  collected: number;
  pending: number;
}

export interface ReportLink {
  id: string;
  title: string;
  hint: string;
  icon: string;
}
