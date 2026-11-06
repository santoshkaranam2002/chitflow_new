export type PaymentStatus = 'Completed' | 'Pending';
export type PaymentMethod = 'UPI' | 'Card' | 'Net Banking' | 'Cash';

export interface Payment {
  id: string;
  title: string;
  subtitle: string;
  /** ISO date */
  date: string;
  amount: number;
  sign: '+' | '-';
  icon: string;
  bg: string;
  color: string;
  status: PaymentStatus;
  method: PaymentMethod;
  txnId: string;
}
