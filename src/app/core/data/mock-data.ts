// Dummy data (design preview only). Each service owns one slice – swap these for API calls later.
import {
  Auction, AppNotification, Bid, ChitGroup, FaqItem, GroupReportRow, Member, NavItem, Payment,
  ReportLink, ReportPeriod, ReportSummary, SettingToggle, UserProfile,
} from '../models';
import { inDays } from '../utils/date.util';

export const USER: UserProfile = {
  name: 'Santosh Karanam', initials: 'SK', mobile: '9876543210', email: 'santosh@chitflow.com',
  city: 'Hyderabad', memberSince: '2025-01-12T00:00:00.000Z',
};

export const GROUPS: ChitGroup[] = [
  { id: 'g1', name: 'Dream Home', value: 100000, monthly: 5000, members: 20, paid: 12, duration: 20, month: 8, nextAuction: inDays(9), commission: 5, icon: 'home', bg: '#ffe6d8', color: '#f26a1b', mine: true },
  { id: 'g2', name: 'Gold Plus', value: 50000, monthly: 3333, members: 15, paid: 8, duration: 15, month: 6, nextAuction: inDays(0, 18), commission: 5, icon: 'coin', bg: '#fff0c9', color: '#d99a06', mine: true },
  { id: 'g3', name: 'Family Support', value: 75000, monthly: 5000, members: 15, paid: 5, duration: 15, month: 4, nextAuction: inDays(44), commission: 5, icon: 'users', bg: '#ece8fd', color: '#6c55d9', mine: true },
  { id: 'g4', name: 'Business Growth', value: 150000, monthly: 15000, members: 10, paid: 3, duration: 10, month: 3, nextAuction: inDays(65), commission: 5, icon: 'trend', bg: '#e6e9f7', color: '#4a55b5', mine: true },
  { id: 'g5', name: 'Festival Saver', value: 25000, monthly: 2500, members: 10, paid: 6, duration: 10, month: 5, nextAuction: inDays(21), commission: 3, icon: 'gift', bg: '#fde2ee', color: '#d6336c', mine: false },
  { id: 'g6', name: 'Education Fund', value: 200000, monthly: 10000, members: 20, paid: 9, duration: 20, month: 7, nextAuction: inDays(33), commission: 5, icon: 'cap', bg: '#dff0fb', color: '#2b8ad6', mine: false },
];

export const MEMBERS: Member[] = [
  { id: 'm1', initials: 'RK', name: 'Ravi Kumar', no: 'M001', status: 'Paid', color: '#ffd8c8', phone: '98765 43210', joined: '2025-01-10T00:00:00.000Z', groups: 2, totalPaid: 60000, pending: 0, mine: true },
  { id: 'm2', initials: 'SB', name: 'Suresh Babu', no: 'M002', status: 'Paid', color: '#d9e4fb', phone: '98765 43211', joined: '2025-02-02T00:00:00.000Z', groups: 1, totalPaid: 45000, pending: 0, mine: true },
  { id: 'm3', initials: 'LD', name: 'Latha Devi', no: 'M003', status: 'Pending', color: '#ffd3d3', phone: '98765 43212', joined: '2025-02-18T00:00:00.000Z', groups: 2, totalPaid: 35000, pending: 5000, mine: true },
  { id: 'm4', initials: 'KB', name: 'Karthik B', no: 'M004', status: 'Paid', color: '#cdeedd', phone: '98765 43213', joined: '2025-03-05T00:00:00.000Z', groups: 3, totalPaid: 80000, pending: 0, mine: false },
  { id: 'm5', initials: 'PK', name: 'Pavan Kumar', no: 'M005', status: 'Paid', color: '#e0dcfb', phone: '98765 43214', joined: '2025-03-21T00:00:00.000Z', groups: 1, totalPaid: 25000, pending: 0, mine: false },
  { id: 'm6', initials: 'NS', name: 'Nandini Sai', no: 'M006', status: 'Pending', color: '#ffd9c8', phone: '98765 43215', joined: '2025-04-09T00:00:00.000Z', groups: 2, totalPaid: 30000, pending: 3333, mine: true },
];

const green = { bg: '#dcf5e6', color: '#1b8a4b' };
const orange = { bg: '#ffe6d8', color: '#f26a1b' };
const blue = { bg: '#dff0fb', color: '#2b8ad6' };
const red = { bg: '#fde2e2', color: '#e5432d' };

export const PAYMENTS: Payment[] = [
  { id: 'p1', title: 'Monthly Contribution', subtitle: 'Dream Home', date: inDays(-4), amount: 5000, sign: '+', icon: 'up', ...green, status: 'Completed', method: 'UPI', txnId: 'CF70418' },
  { id: 'p2', title: 'Auction Payment', subtitle: 'Gold Plus', date: inDays(-9), amount: 10000, sign: '-', icon: 'gavel', ...orange, status: 'Completed', method: 'Net Banking', txnId: 'CF70391' },
  { id: 'p3', title: 'Monthly Contribution', subtitle: 'Family Support', date: inDays(-12), amount: 5000, sign: '+', icon: 'users', ...blue, status: 'Completed', method: 'UPI', txnId: 'CF70355' },
  { id: 'p4', title: 'Penalty', subtitle: 'Business Growth', date: inDays(-17), amount: 500, sign: '-', icon: 'alert', ...red, status: 'Completed', method: 'Card', txnId: 'CF70302' },
  { id: 'p5', title: 'Monthly Contribution', subtitle: 'Business Growth', date: inDays(3), amount: 15000, sign: '-', icon: 'clock', bg: '#ffe7d1', color: '#d9730d', status: 'Pending', method: 'UPI', txnId: 'CF70512' },
  { id: 'p6', title: 'Monthly Contribution', subtitle: 'Gold Plus', date: inDays(1), amount: 3333, sign: '-', icon: 'clock', bg: '#ffe7d1', color: '#d9730d', status: 'Pending', method: 'UPI', txnId: 'CF70519' },
];

export const GROUP_RECENT_PAYMENTS: Payment[] = [
  { id: 'gp1', title: 'Ravi Kumar', subtitle: 'Paid', date: inDays(-4), amount: 5000, sign: '+', icon: 'up', ...green, status: 'Completed', method: 'UPI', txnId: 'CF70420' },
  { id: 'gp2', title: 'Suresh Babu', subtitle: 'Paid', date: inDays(-6), amount: 5000, sign: '+', icon: 'up', ...green, status: 'Completed', method: 'UPI', txnId: 'CF70411' },
];

export const PAYMENT_BARS: number[] = [20, 28, 35, 42, 60, 48];

export const AUCTIONS: Auction[] = [
  { id: 'a1', groupId: 'g1', name: 'Dream Home', value: 100000, date: inDays(9), status: 'Upcoming', paid: 12, total: 20, minBid: 1000, commission: 5, icon: 'home', bg: '#ffe6d8', color: '#f26a1b' },
  { id: 'a2', groupId: 'g2', name: 'Gold Plus', value: 50000, date: inDays(0, 10), status: 'Live', paid: 8, total: 15, minBid: 1000, commission: 5, icon: 'coin', bg: '#fff0c9', color: '#d99a06' },
  { id: 'a3', groupId: 'g3', name: 'Family Support', value: 75000, date: inDays(44), status: 'Upcoming', paid: 5, total: 15, minBid: 1500, commission: 5, icon: 'users', bg: '#ece8fd', color: '#6c55d9' },
  { id: 'a4', groupId: 'g4', name: 'Business Growth', value: 150000, date: inDays(65), status: 'Upcoming', paid: 3, total: 10, minBid: 2000, commission: 5, icon: 'trend', bg: '#e6e9f7', color: '#4a55b5' },
  { id: 'a5', groupId: 'g5', name: 'Festival Saver', value: 25000, date: inDays(-20), status: 'Completed', paid: 10, total: 10, minBid: 500, commission: 3, icon: 'gift', bg: '#fde2ee', color: '#d6336c' },
];

export const BIDS: Bid[] = [
  { id: 3, name: 'Santosh Karanam', amount: 10000, isYou: true, time: '10:02 AM' },
  { id: 2, name: 'Suresh Babu', amount: 9000, isYou: false, time: '10:01 AM' },
  { id: 1, name: 'Ravi Kumar', amount: 8000, isYou: false, time: '10:00 AM' },
];

export const BIDDER_NAMES = ['Suresh Babu', 'Ravi Kumar', 'Latha Devi', 'Karthik B', 'Nandini Sai', 'Pavan Kumar'];

export const REPORTS: Record<ReportPeriod, ReportSummary> = {
  '3M': { total: 28500, change: 6, points: [{ label: 'Sep', value: 52 }, { label: 'Oct', value: 70 }, { label: 'Nov', value: 86 }] },
  '6M': { total: 36200, change: 9, points: [{ label: 'Jun', value: 30 }, { label: 'Jul', value: 44 }, { label: 'Aug', value: 38 }, { label: 'Sep', value: 58 }, { label: 'Oct', value: 72 }, { label: 'Nov', value: 90 }] },
  '1Y': { total: 45000, change: 12, points: [{ label: 'Aug', value: 30 }, { label: 'Sep', value: 40 }, { label: 'Oct', value: 70 }, { label: 'Nov', value: 100 }] },
};

export const REPORT_LINKS: ReportLink[] = [
  { id: 'group', title: 'Group Wise Summary', hint: 'Collected vs pending per group', icon: 'grid' },
  { id: 'member', title: 'Member Contribution Report', hint: 'Who paid, who is due', icon: 'users' },
  { id: 'payment', title: 'Payment History', hint: 'Every transaction in one place', icon: 'card' },
  { id: 'auction', title: 'Auction Report', hint: 'Winners, discounts, dividends', icon: 'gavel' },
];

export const REPORT_ROWS: GroupReportRow[] = [
  { group: 'Dream Home', members: 20, collected: 60000, pending: 40000 },
  { group: 'Gold Plus', members: 15, collected: 26664, pending: 23331 },
  { group: 'Family Support', members: 15, collected: 25000, pending: 50000 },
  { group: 'Business Growth', members: 10, collected: 45000, pending: 105000 },
];

export const NOTIFICATIONS: AppNotification[] = [
  { id: 1, kind: 'auction', icon: 'gavel', title: 'Auction reminder', text: 'Auction for Gold Plus goes live today at 10:00 AM', time: '10 min ago', section: 'Today', read: false },
  { id: 2, kind: 'payment', icon: 'up', title: 'Payment received', text: 'Payment of ₹5,000 received for Dream Home', time: 'Yesterday', section: 'Today', read: false },
  { id: 3, kind: 'penalty', icon: 'alert', title: 'Penalty added', text: 'Penalty of ₹500 added in Business Growth', time: '2 days ago', section: 'Earlier', read: false },
  { id: 4, kind: 'system', icon: 'trophy', title: 'Dividend credited', text: 'You received a dividend of ₹500 from Festival Saver', time: '1 week ago', section: 'Earlier', read: true },
  { id: 5, kind: 'system', icon: 'shield', title: 'Security tip', text: 'Never share your OTP or password with anyone', time: '2 weeks ago', section: 'Earlier', read: true },
];

export const SETTING_TOGGLES: SettingToggle[] = [
  { id: 'push', label: 'Push notifications', hint: 'Alerts for everything important', icon: 'bell', on: true },
  { id: 'auction', label: 'Auction reminders', hint: '30 minutes before bidding opens', icon: 'gavel', on: true },
  { id: 'payment', label: 'Payment alerts', hint: 'Dues, receipts and penalties', icon: 'card', on: true },
  { id: 'biometric', label: 'Biometric login', hint: 'Use fingerprint or face unlock', icon: 'fingerprint', on: false },
];

export const FAQS: FaqItem[] = [
  { question: 'How do I join a chit group?', answer: 'Open Groups, choose a group and contact the foreman to be added as a member.' },
  { question: 'How is the auction winner decided?', answer: 'The member offering the highest discount when the auction closes wins the prize amount.' },
  { question: 'When is my contribution due?', answer: 'Monthly contributions are due before the auction date of your group.' },
  { question: 'How is dividend calculated?', answer: 'Winning discount minus foreman commission, divided equally among all members.' },
];

export const NAV_ITEMS: NavItem[] = [
  { path: '/home', icon: 'home', label: 'Home' },
  { path: '/groups', icon: 'users', label: 'Groups' },
  { path: '/payments', icon: 'card', label: 'Payments' },
  { path: '/reports', icon: 'bar', label: 'Reports' },
];

export const DRAWER_MENU: NavItem[] = [
  { path: '/home', icon: 'grid', label: 'Dashboard' },
  { path: '/groups', icon: 'users', label: 'My Groups' },
  { path: '/payments', icon: 'card', label: 'Payments' },
  { path: '/auctions', icon: 'gavel', label: 'Auction' },
  { path: '/members', icon: 'user', label: 'Members' },
  { path: '/reports', icon: 'bar', label: 'Reports' },
  { path: '/notifications', icon: 'bell', label: 'Notifications', badge: 'unread' },
  { path: '/settings', icon: 'settings', label: 'Settings' },
  { path: '/help', icon: 'help', label: 'Help & Support' },
];
