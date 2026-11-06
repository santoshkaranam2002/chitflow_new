export interface ChitGroup {
  id: string;
  name: string;
  /** Total chit value in ₹ */
  value: number;
  /** Monthly contribution in ₹ */
  monthly: number;
  /** Total members in the group */
  members: number;
  /** Members who have paid this month */
  paid: number;
  /** Duration in months */
  duration: number;
  /** Current running month */
  month: number;
  /** ISO date of the next auction */
  nextAuction: string;
  commission: number;
  icon: string;
  bg: string;
  color: string;
  /** Group the logged-in user belongs to */
  mine: boolean;
}
