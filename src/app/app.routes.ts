import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ---- public screens ----
  { path: 'login', title: 'Login • ChitFlow', loadComponent: () => import('./pages/login/login').then((m) => m.Login) },
  { path: 'register', title: 'Create account • ChitFlow', loadComponent: () => import('./pages/register/register').then((m) => m.Register) },
  { path: 'forgot-password', title: 'Forgot password • ChitFlow', loadComponent: () => import('./pages/forgot-password/forgot-password').then((m) => m.ForgotPassword) },

  // ---- signed-in screens (bottom navigation + drawer) ----
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell').then((m) => m.Shell),
    children: [
      { path: 'home', title: 'Home • ChitFlow', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },

      { path: 'groups', title: 'Chit Groups • ChitFlow', loadComponent: () => import('./pages/groups/groups').then((m) => m.Groups) },
      { path: 'groups/create', title: 'Create Group • ChitFlow', loadComponent: () => import('./pages/create-group/create-group').then((m) => m.CreateGroup) },
      { path: 'groups/details', title: 'Group Details • ChitFlow', loadComponent: () => import('./pages/group-details/group-details').then((m) => m.GroupDetails) },

      { path: 'members', title: 'Members • ChitFlow', loadComponent: () => import('./pages/members/members').then((m) => m.Members) },
      { path: 'members/add', title: 'Add Member • ChitFlow', loadComponent: () => import('./pages/add-member/add-member').then((m) => m.AddMember) },
      { path: 'members/details', title: 'Member Details • ChitFlow', loadComponent: () => import('./pages/member-details/member-details').then((m) => m.MemberDetails) },

      { path: 'payments', title: 'Payments • ChitFlow', loadComponent: () => import('./pages/payments/payments').then((m) => m.Payments) },
      { path: 'payments/make', title: 'Make Payment • ChitFlow', loadComponent: () => import('./pages/make-payment/make-payment').then((m) => m.MakePayment) },
      { path: 'payments/receipt', title: 'Receipt • ChitFlow', loadComponent: () => import('./pages/payment-receipt/payment-receipt').then((m) => m.PaymentReceipt) },

      { path: 'auctions', title: 'Auctions • ChitFlow', loadComponent: () => import('./pages/auctions/auctions').then((m) => m.Auctions) },
      { path: 'auctions/details', title: 'Auction Details • ChitFlow', loadComponent: () => import('./pages/auction-details/auction-details').then((m) => m.AuctionDetails) },
      { path: 'auctions/live', title: 'Live Auction • ChitFlow', loadComponent: () => import('./pages/live-auction/live-auction').then((m) => m.LiveAuction) },
      { path: 'auctions/add', title: 'Add Auction • ChitFlow', loadComponent: () => import('./pages/add-auction/add-auction').then((m) => m.AddAuction) },
      { path: 'auctions/result', title: 'Auction Result • ChitFlow', loadComponent: () => import('./pages/auction-result/auction-result').then((m) => m.AuctionResult) },

      { path: 'reports', title: 'Reports • ChitFlow', loadComponent: () => import('./pages/reports/reports').then((m) => m.Reports) },
      { path: 'reports/detail', title: 'Report • ChitFlow', loadComponent: () => import('./pages/report-detail/report-detail').then((m) => m.ReportDetail) },

      { path: 'notifications', title: 'Notifications • ChitFlow', loadComponent: () => import('./pages/notifications/notifications').then((m) => m.Notifications) },
      { path: 'profile', title: 'My Profile • ChitFlow', loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile) },
      { path: 'settings', title: 'Settings • ChitFlow', loadComponent: () => import('./pages/settings/settings').then((m) => m.Settings) },
      { path: 'settings/change-password', title: 'Change Password • ChitFlow', loadComponent: () => import('./pages/change-password/change-password').then((m) => m.ChangePassword) },
      { path: 'help', title: 'Help & Support • ChitFlow', loadComponent: () => import('./pages/help-support/help-support').then((m) => m.HelpSupport) },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
