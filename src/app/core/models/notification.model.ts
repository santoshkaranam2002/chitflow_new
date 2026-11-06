export type NotificationKind = 'auction' | 'payment' | 'penalty' | 'system';

export interface AppNotification {
  id: number;
  kind: NotificationKind;
  icon: string;
  title: string;
  text: string;
  time: string;
  /** Section label used for grouping */
  section: 'Today' | 'Earlier';
  read: boolean;
}
