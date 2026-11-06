export interface UserProfile {
  name: string;
  initials: string;
  mobile: string;
  email: string;
  city: string;
  memberSince: string;
}

export type Language = 'English' | 'తెలుగు' | 'हिन्दी';

export interface SettingToggle {
  id: string;
  label: string;
  hint: string;
  icon: string;
  on: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}
