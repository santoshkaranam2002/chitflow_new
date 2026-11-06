export type AuctionStatus = 'Live' | 'Upcoming' | 'Completed';

export interface Auction {
  id: string;
  groupId: string;
  name: string;
  /** Chit value in ₹ */
  value: number;
  /** ISO date-time */
  date: string;
  status: AuctionStatus;
  paid: number;
  total: number;
  minBid: number;
  commission: number;
  icon: string;
  bg: string;
  color: string;
}

export interface Bid {
  id: number;
  name: string;
  amount: number;
  isYou: boolean;
  time: string;
}

export interface AuctionResult {
  group: string;
  chitValue: number;
  winner: string;
  discount: number;
  commission: number;
  members: number;
}
