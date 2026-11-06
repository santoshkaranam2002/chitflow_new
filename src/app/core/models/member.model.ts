export type MemberStatus = 'Paid' | 'Pending';

export interface Member {
  id: string;
  initials: string;
  name: string;
  no: string;
  status: MemberStatus;
  color: string;
  phone: string;
  /** ISO date */
  joined: string;
  groups: number;
  totalPaid: number;
  pending: number;
  mine: boolean;
}
